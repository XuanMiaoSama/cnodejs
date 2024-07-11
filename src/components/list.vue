<template>
	<div class="list">
		<Avatar class="img" :author="info.author"></Avatar>
		<div class="count">
			<span class="replay">{{ info.reply_count }}</span>/<span class="visited">{{ info.visit_count }}</span>
		</div>
		<Mark :info="info"></Mark>
		<p class="link">
			<router-link :to="'/detail/' + info.id">
				{{ info.title }}
			</router-link>
		</p>
		<Avatar :size="20" :author="info.reply_count > 0 ? info.author : {}"></Avatar>
		<div class="time">{{ diff(info.last_reply_at) }}</div>
	</div>
</template>

<script>
import { info } from 'sass';
import { diffTime } from '../utils/time'
export default {
	methods: {
		diff (time) {
			return diffTime(time)
		}
	},
	props: {
		info: {
			type: Object
		}
	}
}
</script>

<style lang="scss" scoped>
.list:hover {
	background: #f5f5f5;
}

.list {
	padding: 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.time {
		font-size: 12px;
		color: #778087;
		width: 60px;
		text-align: right;
	}

	.link {
		width: 590px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-right: 10px;
		margin-left: 5px;

		a:hover {
			text-decoration: underline;
		}

		a:visited {
			color: #888888;
		}
	}

	.count {
		width: 55px;
		margin-left: 5px;
		font-size: 12px;
		display: flex;
		align-items: center;
		margin-left: 10px;

		.visited {
			font-size: 10px;
			color: #b4b4b4;
			margin-top: 2px;
		}

		.replay {
			font-size: 14px;
			color: #9e78c0;
		}
	}
}
</style>