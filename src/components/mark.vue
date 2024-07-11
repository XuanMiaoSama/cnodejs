<template>
	<div class="tab" :class="{ top: info.top || info.good }">{{ mark() }}</div>
</template>

<script>
import cat from '../utils/cat.js'

export default {
	props: {
		info: {
			type: Object
		}
	},
	methods: {
		mark () {
			if (this.info.top) {
				return '置顶';
			} else if (this.info.good) {
				return '精华';
			}
			return this.cat[this.info.tab]
		}
	},
	data () {
		return {
			cat: cat
		}
	},
}
</script>

<style lang="scss" scoped>
.tab {
	width: 32px;
	height: 18px;
	line-height: 18px;
	background: #e5e5e5;
	font-size: 12px;
	text-align: center;
	border-radius: 3px;
	color: #999999;
}

.top {
	background: #80bd01;
	color: #fff;
}
</style>