import { api } from "../api/baseApi";

// Endpoint to fetch initial submissions with server pagination and optional filters
export const recusalSubmissionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRecusalSubmissions: build.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg) => {
            params.append(arg.name, arg.value);
          });
        }
        return {
          url: `/jurors/recusal?${params.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response,
      providesTags: ["RecusalSubmission"],
    }),
    updateRecusalSubmission: build.mutation({
      query: ({ id, body }) => ({
        url: `/jurors/recusal/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["RecusalSubmission"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRecusalSubmissionsQuery,
  useUpdateRecusalSubmissionMutation,
} = recusalSubmissionApi;
