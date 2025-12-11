import { useMutation } from "@tanstack/react-query";
import { postReservation } from "@/app/apis";
import { ReservationRequest } from "@/types";

export const useCreateReservation = () => {
  return useMutation({
    mutationFn: (data: ReservationRequest) => postReservation(data),
  });
};
