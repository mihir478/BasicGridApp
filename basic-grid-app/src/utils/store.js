import create from "zustand";
import { STATUS } from "./utils";

const useGridStore = create((set) => ({
  search: "",
  rowData: [
    {
      userId: "admin",
      firstName: "Admin",
      lastName: "User",
      email: "support@cixsoft.com",
      status: STATUS.REGISTERED,
      createdOn: new Date(2022, 3, 14, 15, 3, 45),
    },
    {
      userId: "megray",
      firstName: "Meg",
      lastName: "Ray",
      email: "meg@fas.com",
      status: STATUS.INITIATED,
      createdOn: new Date(2022, 4, 24, 15, 4, 15),
    },
    {
      userId: "tomh",
      firstName: "Tom",
      lastName: "H",
      email: "tom@test.com",
      status: STATUS.INITIATED,
      createdOn: new Date(2022, 4, 24, 20, 9, 45),
    },
  ],
  setSearch: (search) =>
    set(() => ({
      search,
    })),
  addUser: (user) =>
    set((state) => ({
      rowData: [...state.rowData, user],
    })),
  deleteUser: (userId) =>
    set((state) => {
      const index = state.rowData.findIndex((user) => user.userId === userId);
      return {
        rowData: [...state.rowData.slice(0, index), ...state.slice(index + 1)],
      };
    }),
  editUser: (editedUser) =>
    set((state) => {
      const index = state.rowData.findIndex(
        (user) => user.userId === editedUser.userId
      );
      return {
        rowData: [
          ...state.rowData.slice(0, index),
          { ...editedUser },
          ...state.slice(index + 1),
        ],
      };
    }),
}));

export default useGridStore;
