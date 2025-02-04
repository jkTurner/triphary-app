import React, { useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { AuthChangeEvent, User } from '@supabase/supabase-js'
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

		// 1. check initial auth state (on app load)
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUserState(session?.user || null);
			if(session?.user) {
				fetchAndUpdateUserData(session.user);
				router.replace('/home')
			} else {
				router.replace('/welcome')
			}
		})

		// 2. listen only for sign-in / sign-out events
		const {data: authListener } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
			if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
				setUserState(session?.user || null);
				if (session?.user) {
					fetchAndUpdateUserData(session.user);
					router.replace('/home');
				} else {
					router.replace('/welcome');
				}
			}
		});

		return () => {
			authListener?.subscription.unsubscribe();
		};

	}, []);

	return (
		<Stack screenOptions = {{headerShown: false}}/>
	)
}

export default _layout

