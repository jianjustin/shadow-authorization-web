<template>
    <v-container fill-height fluid grid-list-xl>
        <v-layout justify-center wrap>
            <v-flex md12>
                <div>
                    <material-card color="general" title="系统资源管理面板">
                        <v-spacer />
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="general" class="mb-2" v-on="on">添加资源</v-btn><!--操作按钮列表-->
                            </template>
                            <v-card>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm6>
                                                <v-text-field v-model="editedItem.resourceName" label="资源名称" />
                                            </v-flex>
                                            <v-flex xs12 sm6>
                                                <v-text-field v-model="editedItem.resourceType" label="资源类型" />
                                            </v-flex>
                                            <v-flex xs12 sm6>
                                                <v-text-field v-model="editedItem.resourceUrl" label="资源路径" />
                                            </v-flex>
                                            <v-flex xs12 sm6>
                                                <v-text-field v-model="editedItem.resourceOperation" label="资源操作" />
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer />
                                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-data-table :headers="headers" :items="sysResourceList" :rows-per-page-items="rowsAmount" :pagination.sync="pagination" :total-items="pagination.totalItems">
                            <template slot="headerCell" slot-scope="{ header }">
                                <span class="subheading font-weight-light text-general" v-text="header.text" />
                            </template>
                            <template v-slot:items="props">
                                <td class="justify-center ">{{ props.item.resourceName }}</td>
                                <td class="justify-center ">{{ props.item.resourceType }}</td>
                                <td class="justify-center ">{{ props.item.resourceUrl }}</td>
                                <td class="justify-center ">{{ props.item.resourceOperation }}</td>
                                <td class="justify-center ">
                                    <v-icon medium class="mr-2" @click="editItem(props.item)">edit</v-icon>
                                    <v-icon medium @click="deleteItem(props.item)">delete</v-icon>
                                </td>
                            </template>
                        </v-data-table>
                        <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
                            {{ snackText }}
                            <v-btn flat @click="snack = false">Close</v-btn>
                        </v-snackbar>
                        <v-dialog v-model="delete_dialog" max-width="290">
                            <v-card>
                                <v-card-text>是否确认</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" text @click="delete_dialog = false">
                                        NO
                                    </v-btn>
                                    <v-btn color="green darken-1" text @click="deleteItem1()">
                                        Yes
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </material-card>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    metaInfo () {
        return {
          title: '权限管理系统｜系统资源'
        }
    },
    data: () => ({
        snack: false,
        snackColor: '',
        snackText: '',
        dialog: false,
        delete_dialog: false,
        /*********************表格配置 start**************************/
        rowsAmount: [5, 15, 20, 25], //分页说明
        pagination: {}, //分页参数
        headers: [
            { text: '资源名称', value: 'resourceName' },
            { text: '资源类型', value: 'resourceType' },
            { text: '资源路径', value: 'resourceUrl' },
            { text: '资源操作', value: 'resourceOperation' }
        ],
        sysResourceList: [],
        /*********************表格配置 end**************************/
        editedIndex: -1,
        deletedIndex: -1,
        editedItem: {
            resourceId: '', 
            resourceName: '', 
            resourceType: '',
            resourceUrl: '',
            resourceOperation: ''
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        }
    },

    watch: {
        pagination: {
            handler() {
                this.querySysResourceList(); //改变分页参数需要重新加载数据
            }
        },
        dialog(val) {
            val || this.close()
        }
    },
    created() {},
    methods: {
        /*获取资源数据*/
        querySysResourceList() {
            //获取分页参数
            var { descending, page, rowsPerPage, sortBy, totalItems } = this.pagination;
            if (undefined == page || page == null) page = 1;
            if (undefined == rowsPerPage || rowsPerPage == null) rowsPerPage = 10;
            var _this = this;

            this.$http.post('/sys/resource/findAllByPage', {
                'page': page,
                'size': rowsPerPage
            }).then(response => {
                _this.sysResourceList = response.data.entities;
                _this.pagination.totalItems = response.data.pageInfo.total;
            }).catch(
                error => console.log(error)
            );
        },

        /*弹出确认框*/
        deleteItem(item) {
            this.delete_dialog = true;
            this.deletedIndex = item.resourceId;
        },
        /*资源删除*/
        deleteItem1() {
            var _this = this;
            this.$http.delete('/sys/resource/'+this.deletedIndex)
            .then(response => {
                _this.snack = true;
                _this.snackColor = 'success';
                _this.snackText = '成功删除角色信息';
                _this.querySysResourceList();
            }).catch(
                error => console.log(error)
            ).always(function() {
                this.delete_dialog = false;
            });
        },

        /*弹出修改面板*/
        editItem(item) {
            this.editedIndex = item.resourceId;
            this.editedItem = Object.assign({}, item)
            this.dialog = true;
        },
        /*关闭弹出面板*/
        close() {
            this.dialog = false;
            this.editedItem = {};
            this.editedIndex = -1;
        },

        save() {
            var _this = this;
            if (this.editedIndex > -1) {
                this.$http.put('/sys/resource', {
                    'resourceId': this.editedItem.resourceId,
                    'resourceName': this.editedItem.resourceName, 
                    'resourceType': this.editedItem.resourceType,
                    'resourceUrl': this.editedItem.resourceUrl,
                    'resourceOperation': this.editedItem.resourceOperation
                }).then(response => {
                    _this.snack = true;
                    _this.snackColor = 'success';
                    _this.snackText = '成功修改资源信息';
                    _this.querySysResourceList();
                }).catch(
                    error => console.log(error)
                );
            } else {
                this.$http.post('/sys/resource', {
                    'resourceName': this.editedItem.resourceName, 
                    'resourceType': this.editedItem.resourceType,
                    'resourceUrl': this.editedItem.resourceUrl,
                    'resourceOperation': this.editedItem.resourceOperation
                }).then(response => {
                    _this.snack = true;
                    _this.snackColor = 'success';
                    _this.snackText = '成功添加资源';
                    _this.querySysResourceList();
                }).catch(
                    error => console.log(error)
                );
            }
            this.close()
        }

    }
}
</script>