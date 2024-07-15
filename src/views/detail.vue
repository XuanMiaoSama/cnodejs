<template>
	<div class="detail">
		<div class="title">
			<div class="first">
				<Mark :info="detail" v-if="detail.top || detail.good"></Mark>
				<h2>{{ detail.title }}</h2>
			</div>
			<p class="info">
				<span class="point">●</span>发布于 {{ diff(detail.create_at) }}
				<span class="point">●</span>作者 {{ detail?.author?.loginname }}
				<span class="point">●</span>{{ detail.visit_count }} 次浏览
				<span class="point">●</span>来自 {{ cat[detail.tab] }}
			</p>
			<div v-if="user?.token">
				<el-button type="success" class="btn" v-if="!detail.is_collect"
									 @click="star('collect')">
					收藏
				</el-button>
				<el-button type="info" class="btn" v-else plain @click="star('de_collect')">
					取消收藏
				</el-button>
			</div>
		</div>
		<div class="content" v-html="detail.content"></div>
	</div>
	<div class="replies">
		<Title><span class="count">{{ replies?.length }} 回复</span></Title>
		<ul>
			<li v-for="(reply, index) in replies" class="reply"
					:style="{ background: reply.ups.length >= 3 ? '#f4fcf0' : '' }">
				<div class="left">
					<Avatar :author="reply.author"></Avatar>
				</div>
				<div class="right" @mouseover="reply.isShow = true"
						 @mouseout="reply.isShow = false">
					<p class="link">
						<router-link :to="'/author/' + reply?.author?.loginname" class="name">
							{{ reply?.author?.loginname }}
						</router-link>
						<a href="#" class="time">
							{{ index + 1 }}楼
							<span class="point">●</span>
							{{ diff(reply.create_at) }}
						</a>
					<p class="icon" v-if="user?.token">
						<el-icon class="like" :color="reply.is_uped ? 'black' : ''"
										 @click="like(reply.id)" v-if="reply.isShow || reply?.ups.length > 0">
							<StarFilled />
						</el-icon>
						<span class="likeNum" v-if="reply?.ups.length > 0">
							{{ reply?.ups.length }}
						</span>
						<el-icon class="comment" @click="reply.isOpen = !reply.isOpen">
							<Comment />
						</el-icon>
					</p>
					</p>
					<p class="replyText" v-html="reply.content"></p>
					<div class="edit" :style="{ height: reply.isOpen ? '450px' : '0px' }">
						<div v-html="reply?.value"></div>
						<Editor :id="reply.id" :name="reply.author.loginname" @change="editChange">
						</Editor>
						<el-button type="primary" style="margin-top: 10px;"
											 @click="replyComment(reply.id, reply.value)">提交</el-button>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<div class="topicComment" v-if="user?.token">
		<Title>添加回复</Title>
		<div class="editTopic">
			<Editor @change="commentValue = $event.value"></Editor>
			<el-button type="primary" style="margin-top: 10px;"
								 @click="replyTopic()">提交</el-button>
		</div>
	</div>
</template>

<script>
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { diffTime } from '../utils/time'
import avatar from './../components/avatar.vue'
import cat from '../utils/cat'
export default {
	watch: {
		commentValue () {
			console.log(this.commentValue)
		}
	},
	name: 'detail',
	components: { avatar },
	data () {
		return {
			commentValue: '',
			replies: [],
			detail: {},
			cat,
			user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
		}
	},
	created () {
		this.getDetail()
	},
	methods: {
		replyComment (id, value) {
			axios({
				url: ` https://cnodejs.org/api/v1/topic/${this.$route.params.id}/replies`,
				method: 'post',
				data: {
					accesstoken: this.user?.token,
					content: value,
					reply_id: id
				}
			}).then(res => {
				// console.log(res)
				this.getDetail()
			})
		},
		replyTopic () {
			axios({
				url: ` https://cnodejs.org/api/v1/topic/${this.$route.params.id}/replies`,
				method: 'post',
				data: {
					accesstoken: this.user?.token,
					content: this.commentValue,
				}
			}).then(res => {
				console.log(res)
				this.getDetail()
			})
		},
		editChange (obj) {
			console.log(obj)
			this.replies.forEach((item) => {
				if (obj.id === item.id) {
					item.value = obj.value
				}
			})
		},
		like (id) {
			axios({
				url: 'https://cnodejs.org/api/v1/reply/' + id + '/ups',
				method: 'post',
				data: {
					accesstoken: this.user.token
				}
			}).then(res => {
				if (res.data.success) {
					if (res.data.action == 'up') {
						ElMessage({
							message: '点赞成功',
							type: 'success',
							duration: 1000,
							onClose: () => {
								this.getDetail()
							}
						})
					} else {
						ElMessage({
							message: '取消点赞',
							type: 'error',
							duration: 1000,
							onClose: () => {
								this.getDetail()
							}
						})
					}
				}
			})
		},
		star (tab) {
			axios({
				url: 'https://cnodejs.org/api/v1/topic_collect/' + tab,
				method: 'post',
				data: {
					accesstoken: this.user.token,
					topic_id: this.$route.params.id
				}
			}).then((res) => {
				if (res.data.success) {
					if (tab === 'collect') {
						ElMessage({
							message: '收藏成功',
							type: 'success',
							duration: 1000,
							onClose: () => {
								this.getDetail()
							}
						})
					} else {
						ElMessage({
							message: '取消收藏',
							type: 'error',
							duration: 1000,
							onClose: () => {
								this.getDetail()
							}
						})
					}
				}
			})
		},
		getDetail () {
			axios({
				url: 'https://cnodejs.org/api/v1/topic/' + this.$route.params.id,
				method: 'get',
				params: {
					accesstoken: this.user.token
				}
			}).then((res) => {
				console.log(res.data.data)
				this.detail = res.data.data
				this.replies = res.data.data.replies.map((item) => {
					item.isOpen = false
					item.isShow = false
					return item
				})
				console.log(res.data.data.replies)
			})
		},
		diff (time) {
			return diffTime(time)
		}
	}
}
</script>

<style scoped lang="scss">
.topicComment {
	background: #fff;
	padding-bottom: 20px;
	margin-top: 15px;
	border-radius: 3px;

	.editTopic {
		padding: 0 10px;
		margin-top: 10px;
	}
}

.edit {
	transition: .3s;
	overflow: hidden
}

.detail {
	background: #fff;
	border-radius: 3px;
	overflow: hidden;

	.content {
		padding: 5px 20px;
	}

	.title {
		padding: 18px 10px;
		border-bottom: 1px solid #ccc;
		position: relative;

		.point {
			font-size: 10px;
		}

		.btn {
			position: absolute;
			right: 10px;
			bottom: 10px;
		}

		.info {
			font-size: 12px;
			color: #838383;
			margin-top: 10px;
			margin-bottom: 10px;
		}

		.first {
			display: flex;
			align-items: center;

			h2 {
				font-size: 22px;
				margin-left: 10px;
			}
		}
	}
}

.replies {
	background: #fff;
	border-radius: 3px;
	margin-top: 15px;

	.count {
		font-size: 14px;
	}

	.reply {
		padding: 10px 10px;
		display: flex;
		border-bottom: 1px solid #f0f0f0;

		.left {
			margin-right: 10px;
		}

		.right {
			max-width: 760px;

			.link {
				font-size: 12px;
				position: relative;

				.name {
					font-weight: 800;
					margin-right: 5px;
				}

				.time {
					color: #0088cc;

					.point {
						font-size: 10px;
					}
				}

				.time:hover {
					color: #005580;
					text-decoration: underline;
				}

				.icon {
					color: #929790;
					position: absolute;
					font-size: 18px;
					right: -14px;
					top: -5px;
					display: flex;
					align-items: center;

					.like:hover {
						color: #666666;
					}

					.comment:hover {
						color: #666666;
					}

					.likeNum {
						font-size: 14px;
						margin-right: 5px;
					}
				}

				.icon:hover ::deep .like {
					display: inline-block !important;
				}
			}

			.replyText {
				padding-left: 10px;
				margin-top: -10px;
				margin-bottom: 15px;
				width: 750px;
			}
		}
	}
}
</style>