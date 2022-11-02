import create from "zustand";

const useGridStore = create((set) => ({
  search: "",
  currentUserId: "",
  existingUser: false,
  rowData: [
    {
      userId: "admin",
      firstName: "Admin",
      lastName: "User",
      email: "support@cixsoft.com",
      status: "REGISTERED",
      createdOn: new Date(2022, 3, 14, 15, 3, 45),
    },
    {
      userId: "megray",
      firstName: "Meg",
      lastName: "Ray",
      email: "meg@fas.com",
      status: "INITIATED",
      createdOn: new Date(2022, 4, 24, 15, 4, 15),
    },
    {
      userId: "tomh",
      firstName: "Tom",
      lastName: "H",
      email: "tom@test.com",
      status: "INITIATED",
      createdOn: new Date(2022, 4, 24, 20, 9, 45),
    },
  ],
  setExistingUser: (existingUser) =>
    set(() => ({
      existingUser,
    })),
  setCurrentUserId: (currentUserId) =>
    set(() => ({
      currentUserId,
    })),
  setSearch: (search) =>
    set(() => ({
      search,
    })),
  addUser: (user) =>
    set((state) => ({
      rowData: [...state.rowData, user],
    })),
  deleteUser: () =>
    set((state) => {
      const index = state.rowData.findIndex(
        (user) => user.userId === state.currentUserId
      );
      return {
        rowData: [
          ...state.rowData.slice(0, index),
          ...state.rowData.slice(index + 1),
        ],
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
          ...state.rowData.slice(index + 1),
        ],
      };
    }),
}));

export default useGridStore;
