function selectMenu(webPath,dutyId) {
    parent.bottom.location=webPath + "/om/funcRoleAdmin.do?operType=roleListQuery&dutyId="+dutyId;
    parent.right.location=webPath + "/views/om/blank.html";
}
