import { z, defineCollection } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string().max(60),
		description: z.string().max(160),
		publishDate: z.string().transform((str) => new Date(str)),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
		wordCount: z.number(),
		ogImage: z.string().optional(),
	}),
});

const photo = defineCollection({
	type: "data",
	schema: z.object({
		src: z.string(),
		title: z.string(),
		location: z.string().optional(),
		camera: z.string().optional()
	})
})

const software = defineCollection({
	type: "data",
	schema: z.object({
		name: z.string(),
		desc: z.string(),
		iconSrc: z.string().optional(),
		get: z.string(),
		pp: z.string().optional(),
		platforms: z.array(z.string()),

		links: z.array(z.object({
			title: z.string(),
			url: z.string()
		})).optional(),

		langs: z.array(z.object({
			name: z.string(),
			colour: z.string()
		})).optional()
	})
})

export const collections = {
	'post': post,
	'photo': photo,
	'software': software
};
