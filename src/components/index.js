import Title from "./title.vue";
import List from "./list.vue";
import Avatar from "./avatar.vue";
import Count from "./count.vue";
import Mark from "./mark.vue";
import { Comment } from "@element-plus/icons-vue";
import { StarFilled } from "@element-plus/icons-vue";

export default function (app) {
  app.component("Title", Title);
  app.component("List", List);
  app.component("Avatar", Avatar);
  app.component("Count", Count);
  app.component("Mark", Mark);
  app.component("Comment", Comment);
  app.component("StarFilled", StarFilled);
}
