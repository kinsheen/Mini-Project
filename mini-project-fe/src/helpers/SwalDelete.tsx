import Swal from "sweetalert2";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UpdateFunction = (id: string, status: boolean) => Promise<any>;
type FetchFunction = () => Promise<void>;

// Reusable confirmation function
export async function confirmDeletion(
  title: string,
  itemId: string,
  updateFunction: UpdateFunction,
  fetchDataFunction: FetchFunction
) {
  const result = await Swal.fire({
    title: title || "Are you sure?",
    icon: "warning",
    draggable: true,
    confirmButtonColor: "#0f4c5c",
    showCancelButton: true,
  });

  if (result.isConfirmed) {
    const response = await updateFunction(itemId, false);
    await fetchDataFunction();
    console.log("Deletion process initiated.");

    if (response) {
      console.log("Task deleted successfully:", response);
      // You can add additional logic here if needed
    }
  } else if (result.isDismissed) {
    console.log("User dismissed the alert.");
  }
}
