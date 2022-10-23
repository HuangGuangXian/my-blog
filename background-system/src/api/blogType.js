import request from "@/utils/request";

// 添加分类
export function addBlogtype(data) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data
  });
}

// 获取一个分类
export function getOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'get',
  });
}

// 删除分类
export function deleteBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'delete',
  });
}

// 获取文章分类
export function getBlogType() {
  return request({
    url: '/api/blogtype',
    method: 'get',
  });
}

// 修改分类
export function updateBlogType(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: 'put',
    data: editInfo.data
  });
}
