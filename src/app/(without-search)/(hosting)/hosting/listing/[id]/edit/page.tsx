import { updatePropertyAction } from "@/actions";
import PropertyEditForm from "@/components/create-property/property-edit-form";
import { getSelectedPropertyDetails } from "@/db/queries";
import { verifySession } from "@/lib/dal";
import type { PropertyFormValues } from "@/lib/validationSchema/property.schema";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session_id?: string }>;
}

export default async function EditPropertyPage({ params }: PageProps) {
  const { isAuth: _auth } = await verifySession();

  const { id } = await params;

  const data = await getSelectedPropertyDetails(id);

  const handleUpdateAction = async (values: PropertyFormValues) => {
    "use server";
    return updatePropertyAction({ ...values, propertyId: id });
  };
  return <PropertyEditForm initialValues={JSON.parse(JSON.stringify(data))} action={handleUpdateAction} />;
}
