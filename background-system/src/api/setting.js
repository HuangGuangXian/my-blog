import request from "@/utils/request";

export function getSetting() {
  return request({
    url: "/api/setting",
    method: "get",
  })
}

export function setSetting(data) {
  return request({
    url: "/api/setting",
    method: "put",
    data
  })
}
