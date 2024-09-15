import AdminEditUserForm from "@/components/customui/dashboard/users/EditUserForm";

const AdminUserEditPage = ({ params }) => {
    const { id } = params; 
    console.log("victor",id);
    
    return <AdminEditUserForm userId={id} />;
};

export default AdminUserEditPage;