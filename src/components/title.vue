<template>
	<div class="title">
		<slot></slot>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.title {
	width: 100%;
	display: flex;
	align-items: center;
	height: 40px;
	background: #f6f6f6;
	padding-left: 10px;
	// border-radius: 3px;
	overflow: hidden;
	font-size: 14px;
	color: #444444;
}
</style>
