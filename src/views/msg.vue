<template>
	<div class="msg">
		<div class="new">
			<Title class="Title">
				<router-link to="/home">
					主页
				</router-link>
				/<span>新消息</span>
			</Title>
			<div class="center">
				<div v-if="hasnot_read_messages.length === 0" class="nomsg">无消息</div>
				<div v-else class="list">
					<p v-for="item in hasnot_read_messages">
						<router-link :to="'/author/' + item?.author.loginname">
							{{ item?.author.loginname }}
						</router-link>
						<span v-if="item.type === 'reply'"> 回复了你的话题 </span>
						<span v-if="item.type === 'at'"> 在话题 </span>
						<router-link :to="'/detail/' + item?.topic.id">
							{{ item?.topic.title }}
						</router-link>
						<span v-if="item.type === 'at'"> 中@了你 </span>
					</p>
				</div>
			</div>
		</div>
		<div class="old">
			<Title>
				过往消息
			</Title>
			<div class="center">
				<div v-if="has_read_messages.length === 0" class="nomsg">无消息</div>
				<div v-else class="list">
					<p v-for="item in has_read_messages">
						<router-link :to="'/author/' + item?.author.loginname">
							{{ item?.author.loginname }}
						</router-link>
						<span v-if="item.type === 'reply'"> 回复了你的话题 </span>
						<span v-if="item.type === 'at'"> 在话题 </span>
						<router-link :to="'/detail/' + item?.topic.id">
							{{ item?.topic.title }}
						</router-link>
						<span v-if="item.type === 'at'"> 中@了你 </span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	created () {
		this.getMsg()
	},
	data () {
		return {
			user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
			has_read_messages: [],
			hasnot_read_messages: []
		}
	},
	methods: {
		getMsg () {
			axios({
				url: `https://cnodejs.org/api/v1/messages`,
				method: 'get',
				params: {
					accesstoken: this.user?.token
				}
			}).then(res => {
				console.log(res.data.data)
				this.has_read_messages = res.data.data.has_read_messages
				this.hasnot_read_messages = res.data.data.hasnot_read_messages
				this.read()
			})
		},

		read () {
			axios({
				url: `https://cnodejs.org/api/v1/message/mark_all`,
				method: 'post',
				params: {
					accesstoken: this.user?.token
				}
			}).then(res => {
				console.log(res.data, 'read')
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.msg {
	.center {
		font-size: 14px;
		color: #333333;

		.nomsg {
			padding: 10px;
		}

		.list p {
			padding: 10px;
			border-top: 1px solid #f0f0f0;
		}

		a {
			color: #0088cc;
		}

		a:hover {
			color: #0055a5;
			text-decoration: underline;
		}
	}

	.new {
		background: #fff;
		border-radius: 3px;
		overflow: hidden;
	}

	.old {
		background: #fff;
		border-radius: 3px;
		overflow: hidden;
		margin-top: 15px;
	}
}
</style>