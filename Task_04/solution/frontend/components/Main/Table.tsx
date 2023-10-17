"use client";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import UsersService from "@/services/UsersService";
import { useEffect, useState } from "react";
import UserType from "@/types/UserType";
import ToolBar from "./ToolBar";
import authStore from "@/stores/AuthSore";
import { AxiosError } from "axios";

export default function Table() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
  const fetchData = async () => {
    try {
      const response = await UsersService.getUsers();

      if (response.data) {
        setUsers(response.data);
      }
    } catch (error: any) {
      if (error.response.status == 401) {
        console.log(error);
        setUsers([]);
        authStore.logout();
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUserSelect = (user: UserType) => {
    if (selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
      );
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const isUserSelected = (user: UserType) => {
    console.log(
      selectedUsers.some((selectedUser) => selectedUser.id === user.id)
    );
    return selectedUsers.some((selectedUser) => selectedUser.id === user.id);
  };

  const handleBlockButton = async () => {
    for (const user of selectedUsers) {
      await UsersService.blockUser(user.id);
    }
    fetchData();
    setSelectedUsers([]);
  };

  const handleUnblockButton = async () => {
    for (const user of selectedUsers) {
      await UsersService.unblockUser(user.id);
    }
    fetchData();
    setSelectedUsers([]);
  };

  const handleDeleteButton = async () => {
    for (const user of selectedUsers) {
      await UsersService.deleteUser(user.id);
    }
    fetchData();
    setSelectedUsers([]);
  };

  return (
    <>
      <ToolBar
        handleBlockButton={handleBlockButton}
        handleUnblockButton={handleUnblockButton}
        handleDeleteButton={handleDeleteButton}
      />
      <table className="min-w-full">
        <thead>
          <TableRow head={true}>
            <TableCell />
            <TableCell>
              <div className="flex flex-col">
                <span>Name</span>
                <span className="text-xs opacity-40">Position</span>
              </div>
            </TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Last login</TableCell>
            <TableCell last={true}>Status</TableCell>
          </TableRow>
        </thead>
        <tbody>
          {users.map((user: any) => {
            const isSelected = isUserSelected(user);
            return (
              <TableRow key={user.id}>
                <TableCell>
                  <button
                    onClick={() => handleUserSelect(user)}
                    className={`p-2 rounded-sm border-gray-500 border-2 hover:bg-gray-200 duration-500 ${
                      isSelected ? "bg-gray-200" : "bg-transparent"
                    }`}
                  ></button>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col font-light">
                    <span>{user.first_name}</span>
                    <span className="text-xs opacity-40">{user.position}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-light">{user.email}</span>
                </TableCell>
                <TableCell>
                  <span className="font-light">{formatDate(user.last_login)}</span>
                </TableCell>
                <TableCell last={true}>
                  <span
                    className={`font-light ${
                      user.is_blocked ? "text-red-400" : ""
                    }`}
                  >
                    {user.is_blocked ? "Blocked" : "Active"}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
