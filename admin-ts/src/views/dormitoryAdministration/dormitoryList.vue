<template>
  <div class="dormitoryList mian-container">
    <div class="top">
      <div class="add">
        <el-button icon="Plus" type="primary" @click="pushBuilding"
          >新增楼栋</el-button
        >
      </div>
      <div class="search">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input
              v-model="queryForm.searchKey"
              class="w-50 m-2"
              placeholder="请输入楼号或者楼名"
              prefix-icon="Search"
            />
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="queryForm.floorType"
              class="m-2"
              placeholder="宿舍类型"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" @click="search">查询</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="(columnItem, index) in column"
          align="center"
          :key="index"
          :prop="columnItem.prop"
          :label="columnItem.label"
          :width="columnItem.width"
        />
      </el-table>
      <!-- <div class="floorList">
        <div class="floorItem">
          <div class="img">
            <img src="@/assets/img/house.jpeg" alt="" />
          </div>
          <div class="title">一号楼</div>
          <p class="fp">
            <el-tooltip
              content="该楼层数有七层"
              placement="bottom"
              effect="light"
            >
              <el-button icon="OfficeBuilding" plain>7</el-button>
            </el-tooltip>
            <el-tooltip content="当前入住0人" placement="bottom" effect="light">
              <el-button icon="User" plain>0</el-button>
            </el-tooltip>
          </p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
const $store = useStore();
const options = [
  { label: "不限", value: "" },
  { label: "男宿舍楼", value: "1" },
  { label: "女宿舍楼", value: "2" },
];
const queryForm = reactive({
  searchKey: "",
  floorType: "",
});
const column: any[] = [
  {
    prop: "floorId",
    label: "楼号",
    width:'120',
  },
  {
    prop: "dormitoryName",
    label: "楼名",
    width:'120'
  },
  {
    prop: "floorUrl",
    label: "楼房图片",
  },
  {
    prop: "floorAdminName",
    label: "宿舍楼管理员",
    width:'120'
  },
  {
    prop: "cleanerName",
    label: "保洁人员",
    width:'120'
  },
  {
    prop: "floorType",
    label: "宿舍类型",
    width:'120'
  },
];
const tableData: any[] = [
  {
    floorId: "101010",
  },
];
const search = () => {
  // console.log($store.state.user.userInfo)
  let form = {
    ...queryForm,
    userId: $store.state.user.userInfo.userId,
    permissionRole: $store.state.user.userInfo.permissionRole,
  };
  console.log(form);
};
const pushBuilding = () => {};
</script>

<style lang="scss" scoped>
.top {
  background: #fff;
  padding: 10px;
  margin-bottom: 20px;
  .add {
    margin-bottom: 20px;
  }
  .search {
    margin-bottom: 20px;
  }
}
.content {
  .floorList {
    display: flex;
    .floorItem {
      width: 200px;
      padding: 10px;
      background: #fff;
      cursor: pointer;
      .img {
        width: 100%;
        margin-bottom: 10px;
        img {
          width: 100%;
        }
      }
      .title {
        text-align: center;
        margin-bottom: 10px;
      }
    }
  }
}
.fp {
  font-size: 12px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>