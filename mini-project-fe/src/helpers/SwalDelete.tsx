import Swal from "sweetalert2";

type UpdateFunction = (
  id: number,
  priority: boolean,
  status?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;

// Reusable confirmation function
export async function confirmation(
  title: string,
  itemId: number,
  updateFunction: UpdateFunction,
  priority: boolean,
  status?: string
) {
  const result = await Swal.fire({
    title: title || "Are you sure?",
    icon: "warning",
    draggable: true,
    confirmButtonColor: "#0f4c5c",
    showCancelButton: true,
  });

  if (result.isConfirmed) {
    const response = await updateFunction(itemId, priority, status);
    window.location.reload();
    console.log("Deletion process initiated.");

    if (response) {
      console.log("Task deleted successfully:", response);
      // You can add additional logic here if needed
    }
  } else if (result.isDismissed) {
    console.log("User dismissed the alert.");
  }
}
