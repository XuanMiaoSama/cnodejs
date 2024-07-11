<template>
	<div class="img" :style="{ width: size + 'px', height: size + 'px' }">
		<router-link :to="'/author/' + author.loginname" :style="{ width: size + 'px', height: size + 'px' }" v-if="author">
			<img :style="{ width: size + 'px', height: size + 'px' }" :src="author.avatar_url" alt="">
		</router-link>
	</div>
</template>

<script>
export default {
	props: {
		size: {
			type: Number,
			default: 30
		},
		author: {
			type: Object,
		}
	}
}
</script>

<style lang="sass" scoped>
.img
	border-radius: 5px
	overflow: hidden
</style>