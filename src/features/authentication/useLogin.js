import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isLoggingIn, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("Login successful");
      queryClient.setQueryData(["User"], user.user);
      navigate("/", { replace: true });
    },
    onError: (error) => toast.error("Provided email and password are invalid"),
  });

  return { isLoggingIn, login };
}
