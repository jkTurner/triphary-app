import { supabase } from "@/lib/supabase";
import { uploadFile } from "./imageService";

interface PostData {
	media?: { uri: string; type?: string | null } | string | null;
	body: string;
	userId?: string;
  }


export const createOrUpdatePost = async (post: PostData) => {
	try {
		if (post.media && typeof post.media === 'object' && 'uri' in post.media) {
			const isImage = post.media.type === 'image';
			const folderName = isImage ? 'post_images' : 'post_videos';

			const fileResult = await uploadFile(folderName, post.media.uri, isImage);

			if (!fileResult.success) {
				return fileResult;
			}

			post.media = fileResult.data;
		}

		const { data, error } = await supabase
			.from('posts')
			.upsert(post)
			.select()
			.single();

		if (error) {
			console.error("createPost error: ", error);
			return { success: false, msg: 'Could not create your post' };
		}

		return { success: true, data };
	} catch (error) {
		console.error("createPost error: ", error);
		return { success: false, msg: 'Could not create your post.' };
	}
};

export const fetchPost = async (limit=10) => {

	try {
		const {data, error} = await supabase
		.from('posts')
		.select(`
			*,
			user: users (id, name, image)
			`)
		.order('created_at', {ascending: false})
		.limit(limit);

		if(error) {
			console.log('fetchPosts error: ', error);
			return {success: false, msg: 'Could not fetch the posts'};
		}

		return {success: true, data: data};

	} catch(error) {
		console.error("fetchPosts error: ", error);
		return {success: false, msg: 'Could not fetch the posts'};
	}

};