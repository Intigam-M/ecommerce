import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
    const Auth = (props) => {
        const router = useRouter();
        const { user } = useSelector((state) => state.auth);

        useEffect(() => {
            if (!user) {
                router.push("/login");
            }
        }, [user]);

        return <WrappedComponent {...props} />;
    };

    return Auth;
};

export default withAuth;
