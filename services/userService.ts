import { supabase } from "@/lib/supabase"

export const getUserService = async (userId: string) => {
	try {
		const { data, error } = await supabase
		.from('users')
		.select()
		.eq('id', userId)
		.single();			// only need single row (user) if multiple = error

		if (error) {
			return { success: false, msg: error?.message };
		}

		return { success: true, data };

	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log('❌ got an error (userService): ', error.message);
			return { success: false, msg: error.message };
		}
		console.log('❌ Unexpected error (userService): ', error);
		return { success: false, msg: '❌ An unknown error occured (userService)' };
	}
}

export const updateUserService = async (userId: string, data: Record<string, any>) => {
	try {
		const { error } = await supabase
		.from('users')
		.update(data)
		.eq('id', userId)

		if (error) {
			return { success: false, msg: error?.message };
		}
		return { success: true, data };
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log('got an error: ', error.message);
			return { success: false, msg: error.message };
		}
		console.log('Unexpected error: ', error);
		return { success: false, msg: 'An unknown error occured' };
	}
}

