import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkoutBooking, isCheckingOut } = useCheckout();
  return (
    <Button
      disabled={isCheckingOut}
      onClick={() => checkoutBooking(bookingId)}
      variation="primary"
      size="small"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
