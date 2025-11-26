import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["Users"],
    }),

    updateUserStatusAsAdmin: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/admin/users/${id}`,
        method: "PATCH",
        body: { isActive },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Users"],
    }),

    // update profile for super admin
    updateUserProfileForSuperAdmin: builder.mutation({
      query: (patch) => ({
        url: `/user`,
        method: "PATCH",
        body: patch,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserStatusAsAdminMutation,
  useUpdateUserProfileForSuperAdminMutation,
} = userSlice;
