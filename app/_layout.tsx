import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { getUserService } from '@/services/userService'

const _layout = () => {
	return (
		<AuthProvider>
			<MainLayout />
		</AuthProvider>
	);
};

const MainLayout = () => {

	const {setUserState, updateUserData} = useAuth();
	const router = useRouter();

	const fetchAndUpdateUserData = async (user: User) => {
		try {
			const res = await getUserService(user.id);
			console.log("🛠 Full user data (_layout):", res.data);
			if (res.success) {
				updateUserData(res.data);
			} else {
				console.log('❌ Failed to fetch user data(_layout): ', res.msg);
			}
		} catch (error) {
			console.error('❌ Error in fetchAndUpdateUserData(_layout): ', error);
		}
	};

	useEffect(() => {
		supabase.auth.onAuthStateChange((_event, session) => {
			console.log('📥 session user: ', session?.user);

			if (session?.user) {
				setUserState(session.user);
				fetchAndUpdateUserData(session.user);
				router.replace('/home');
			} else {
				setUserState(null);
				router.replace('/welcome');
			}
		})
	}, []);

	return (
		<Stack screenOptions = {{headerShown: false}}/>
	)
}

export default _layout