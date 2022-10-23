import request from "@/utils/request";

export function findBlog(page = 1, limit = 10) {
  return request({
    url: "/api/blog",
    method: "get",
    params: {
      page,
      limit
    }
  })
}

export function delOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: "delete"
  })
}

export function addBlog(data) {
  return request({
    url: "/api/blog",
    method: "post",
    data
  })
}

// 编辑文章
// 倒时候调用这个接口时，需要传递一个对象
// {
//     id : 要修改的文章的 id,
//     data : 修改的文章的所有内容
// }
export function editBlog(blogInfo) {
  return request({
    url: `/api/blog/${blogInfo.id}`,
    method: "put",
    data: blogInfo.data
  })
}

export function getOneBlogType(id) {
  return request({
    url: `/api/blog/${id}`,
    method: "get"
  })
}
