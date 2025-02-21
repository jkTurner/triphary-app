import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useState } from "react";

// these are for additional fields that exists in public.user

export interface UserData {
	id?: string;
	name?: string;
	phoneNumber?: string;
	address?: string;
	bio?: string;
	image?: string | null;
}

// AuthContext type
interface AuthContextType {
	user: User | null;
	userData: UserData | null;
	setUserState: (authUser: User | null) => void;
	updateUserData: (data: Partial<UserData>) => void;
}

// create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

	const [user, setUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<UserData | null>(null);

	const setUserState = (authUser: User | null) => {
		setUser(authUser);
	};

	const updateUserData = (data: Partial<UserData>) => {
		setUserData((prevData) => ({
			...prevData,
			...data,
		}));
	};

	return (
		<AuthContext.Provider value={{ user, userData, setUserState, updateUserData}}>
			{children}
		</AuthContext.Provider>
	)

}

// custom  hook to access auth context
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

