<template>
	<div>
		<div> {{ n }}</div>
		<button @click="add(10)">点击</button>
	</div>
</template>

<script>
import { ref } from 'vue'
export default {
	setup () {
		const n = ref(10)
		const add = (count) => {
			n.value += count
			console.log(n, "n")
		}

		return {
			n,
			add
		}
	}
}
</script>

<style lang="scss" scoped></style>