<template>
  <div class="layui-layout layui-layout-admin">
    <!-- 编辑框 -->
    <textarea id="jtopo_textfield" style="display:none;width: 60px;position: absolute;z-index: 999;" onkeydown="if(event.keyCode==13)this.blur();"></textarea>
    <div class="layui-header layui-bg-gray">
      <router-link :to="{name: 'topo'}">
        <div class="layui-logo">{{ id.length > 0 ? '返回主拓扑' : '主网络拓扑图' }}</div>
      </router-link>
      <!-- 顶部工具栏 -->
      <div class="layui-nav layui-layout-right">
        <i class="fa fa-pencil-square-o toolbar-icon" aria-hidden="true" title="编辑"
           @click="editor.utils.setEditMode()"></i>
        <i class="fa fa-arrows toolbar-icon" aria-hidden="true" title="全屏查看"
           @click="editor.utils.showInFullScreen(editor.stage.canvas,'RequestFullScreen')"></i>
        <i class="fa fa-align-center toolbar-icon" aria-hidden="true" title="居中显示"
           @click="editor.utils.showInCenter()"></i>
        <i class="fa fa-eye toolbar-icon" aria-hidden="true" title="预览"
           @click="editor.utils.showPic()"></i>
        <i class="fa fa-clipboard toolbar-icon" aria-hidden="true" title="复制"
           @click="editor.utils.cloneSelectedNodes()"></i>
        <i class="fa fa-trash-o toolbar-icon" aria-hidden="true" title="删除"
           @click="editor.utils.deleteSelectedNodes()"></i>
        <i class="fa fa-search-plus toolbar-icon" aria-hidden="true" title="放大"
           @click="editor.utils.scalingBig()"></i>
        <i class="fa fa-search-minus toolbar-icon" aria-hidden="true" title="缩小"
           @click="editor.utils.scalingSmall()"></i>
        <el-button @click="topoGenVisible = true"
                   style="margin-left: 10px" size="mini" round plain
        >生成拓扑</el-button>
        <el-button @click="saveNetTopology()"
                   style="margin-left: 10px" size="mini" round plain
        >保存</el-button>
      </div>
    </div>
    <!-- 生成拓扑图弹窗 -->
    <el-dialog title="生成拓扑图" :visible.sync="topoGenVisible" width="50vw">
      <topo-gen-by-net-form @canceled="topoGenVisible = false" @success="topoGenSucc"></topo-gen-by-net-form>
    </el-dialog>
    <!--添加设备弹窗-->
    <el-dialog title="添加设备" :visible.sync="ShowEquipmentAddForm" width="30vw">
      <equipment-add-form :icons="primaryIconList"
                          @canceled="ShowEquipmentAddForm = false" @success="handleNewEquipments">
      </equipment-add-form>
    </el-dialog>
    <div class="container">
      <div class="layui-row">
        <div class="layui-col-md2">
          <el-scrollbar>
            <el-collapse v-model="activeType" accordion class="eq-collapse">
              <el-collapse-item name="添加设备">
                <template slot="title"><div class="eq-collapse-item-title">添加设备</div></template>
                <div class="equipment-add" @click="handleEquipmentAdd()">
                  <i class="el-icon-plus equipment-add-icon" ></i>
                </div>
              </el-collapse-item>
              <el-collapse-item name="连线">
                <template slot="title"><div class="eq-collapse-item-title">连线</div></template>
                <table width="100%">
                  <tr>
                    <td width="100%" align="center">
                      <div topo-div-type="topo-link" topo-linktype="line"
                           draggable="false"
                           @click="editor.lineType='line'">
                        <img class="link-icon-style" id="link-line"
                             src="@/static/jtopo/img/line.png"/>
                        <br><span>连线</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <div topo-div-type="topo-link" topo-linktype="foldline"
                           draggable="false"
                           @click="editor.lineType='foldLine';editor.config.direction='horizontal';">
                        <img class="link-icon-style" id="link-foldline-h"
                             src="@/static/jtopo/img/foldline_horizontal.png"/>
                        <br><span>折线(横向)</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <div topo-div-type="topo-link" topo-linktype="foldline"
                           draggable="false"
                           @click="editor.lineType='foldLine';editor.config.direction='vertical';">
                        <img class="link-icon-style" id="link-foldline-v"
                             src="@/static/jtopo/img/foldline_vertical.png"/>
                        <br><span>折线(纵向)</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <div topo-div-type="topo-link" topo-linktype="flexline"
                           draggable="false"
                           @click="editor.lineType='flexLine';editor.config.direction='horizontal';">
                        <img class="link-icon-style" id="link-flexline-h"
                             src="@/static/jtopo/img/flexline_horizontal.png"/>
                        <br><span>二次折线(横向)</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <div topo-div-type="topo-link" topo-linktype="flexline"
                           draggable="false"
                           @click="editor.lineType='flexLine';editor.config.direction='vertical';">
                        <img class="link-icon-style" id="link-flexline-v"
                             src="@/static/jtopo/img/flexline_vertical.png"/>
                        <br><span>二次折线(纵向)</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <div topo-div-type="topo-link" topo-linktype="curveline" draggable="false"
                           @click="editor.lineType='curveLine'">
                        <img class="link-icon-style" id="link-curveline"
                             src="@/static/jtopo/img/line_curveline.png"/>
                        <br><span>曲线</span>
                      </div>
                    </td>
                  </tr>
                </table>
              </el-collapse-item>
              <el-collapse-item name="特殊">
                <template slot="title"><div class="eq-collapse-item-title">特殊</div></template>
                <table width="100%">
                  <tr>
                    <td width="100%" align="center">
                      <div topo-div-type="topo-node" topo-nodetype="TEXT" draggable="true" >
                        <img class="node-icon-style" src="@/static/jtopo/img/icon_text.png"/>
                        <br><span>文字框</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <div topo-div-type="topo-node" topo-nodetype="TOPOLOGY" draggable="true" >
                        <img class="node-icon-style" src="@/static/jtopo/img/icon_universal_service.png"/>
                        <br><span>子拓扑</span>
                      </div>
                    </td>
                  </tr>
                </table>
              </el-collapse-item>
              <!-- 动态设备列表 -->
              <el-collapse-item v-for="item in EquipmentList" :key="item.type" :name="item.type">
                <template slot="title"><div class="eq-collapse-item-title">{{item.type}}</div></template>
                <table width="100%" class="eq-dynamic-table">
                  <tr v-for="listItem in item.list" :key="listItem.name" class="eq-dynamic-line">
                    <td width="100%" align="center" style="position: relative">
                      <div topo-div-type="topo-node" topo-nodetype="SECURITY" draggable="true">
                        <img class="node-icon-style" :src="listItem.imgUrl"/>
                        <br><span>{{listItem.name}}</span>
                      </div>
                      <span class="eq-dynamic-delete" @click.prevent="handleDeleteEquipment(listItem.name)"></span>
                    </td>
                  </tr>
                </table>
              </el-collapse-item>
              <!-- 动态设备列表 over -->
            </el-collapse>
          </el-scrollbar>
        </div>
        <div class="layui-col-md8">
          <div id="topology-body" class="topology-context">
            <!-- 节点右键菜单 -->
            <div id="node-menu" class="right-click-menu" style="z-index: 9">
              <div class="fa fa-wrench menu-item" @click="handleNodeSetting"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>节点设置</span>
              </div>
              <div class="fa fa-th-large menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>应用布局</span>
              </div>
              <div class="fa fa-th-list menu-item" id="change-node-text-pos"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>文字位置</span>
              </div>
              <div class="fa fa-search-plus menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>放大(Shift+)</span>
              </div>
              <div class="fa fa-search-minus menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>缩小(Shift-)</span>
              </div>
              <div class="fa fa-rotate-right menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>顺时针旋转(Shift+U)</span>
              </div>
              <div class="fa fa-rotate-left menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>逆时针旋转(Shift+I)</span>
              </div>
              <div class="fa fa-times menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>删除节点(Delete)</span>
              </div>
              <div class="fa fa-files-o menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>复制节点(Shift+C)</span>
              </div>
              <div class="fa fa-mail-reply menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>撤销(Shift+Z)</span></div>
              <div class="fa fa-mail-forward menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>重做(Shift+R)</span></div>
            </div>
            <!-- 应用布局选项(二级菜单) -->
            <div id="layout-menu" class="right-click-menu" style="z-index: 9">
              <div class="fa fa-minus-circle menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>取消布局</span>
              </div>
              <div class="fa fa-object-group menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>分组布局</span>
              </div>
              <div class="fa fa-share-alt menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>树形布局</span>
              </div>
              <div class="fa fa-dot-circle-o menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>圆形布局</span>
              </div>
            </div>
            <!-- 文字位置选项(二级菜单) -->
            <div id="node-text-pos-menu" class="right-click-menu" style="z-index: 9">
              <div class="menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>顶部居左</span>
              </div>
              <div class="menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>顶部居中</span>
              </div>
              <div class="menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>顶部居右</span>
              </div>
              <div class="menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>中间居左</span>
              </div>
              <div class="menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>居中</span>
              </div>
              <div class="menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>中间居右</span></div>
              <div class="menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>底部居左</span>
              </div>
              <div class="menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>底部居中</span>
              </div>
              <div class="menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>底部居右</span>
              </div>
            </div>
            <!-- 连线右键菜单 -->
            <div id="line-menu" class="right-click-menu" style="z-index: 9">
              <!--<div class="modeRightEdit" onMouseMove="this.style.backgroundColor='#c5e7f6'"-->
              <!--onMouseOut="this.style.backgroundColor=''"><span class="menuSpan">添加描述</span></div>-->
              <div class="fa fa-wrench menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>连线设置</span>
              </div>
              <div class="fa fa-times menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>删除连线</span></div>
            </div>
            <!-- 舞台右键菜单 -->
            <div id="main-menu" class="right-click-menu" style="z-index: 9">
              <div class="fa fa-search-plus menu-item"
                   @click="editor.utils.scalingBig()"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>放大(Shift+)</span>
              </div>
              <div class="fa fa-search-minus menu-item" @click="editor.utils.scalingSmall()"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>缩小(Shift-)</span>
              </div>
              <div class="fa fa-eye menu-item" @click="editor.utils.showPic();"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>预览(Shift+P)</span>
              </div>
              <div class="fa fa-arrows menu-item"
                   @click="editor.utils.showInFullScreen(editor.stage.canvas,'RequestFullScreen')"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>全屏查看(Shift+F)</span>
              </div>
              <div class="fa fa-align-center menu-item" @click="editor.utils.showInCenter()"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>居中显示(Shift+G)</span>
              </div>
              <div class="fa fa-floppy-o menu-item" @click="saveNetTopology()"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>保存(Shift+S)</span>
              </div>
              <div class="fa fa-question-circle menu-item" @click="alert('帮助文档')"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span id="showHelp">查看帮助(Shift+H)</span>
              </div>
              <div class="fa fa-info-circle menu-item"
                   @click="window.open('json_view.html', '当前拓扑结构JSON展示', '').document.write(editor.stage.toJson())"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span id="showJSON">查看拓扑JSON结构</span></div>
            </div>
            <!-- 分组选项(二级菜单) -->
            <div id="group-mange-menu" class="right-click-menu" style="z-index: 9">
              <div class="fa fa-pencil-square-o menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>新建分组</span>
              </div>
              <div class="fa fa-align-left menu-item" id="align-group"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>对齐方式</span>
              </div>
            </div>
            <div class="right-click-menu" id="group-align-menu" style="z-index: 9">
              <div class="menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>水平对齐</span>
              </div>
              <div class="menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>垂直对齐</span>
              </div>
            </div>
            <div class="right-click-menu" id="container-mange-menu" style="z-index: 9">
              <div class="fa fa-columns menu-item"
                   onMouseMove="this.style.backgroundColor='#c5e7f6'"
                   onMouseOut="this.style.backgroundColor=''">
                <span>拆分</span>
              </div>
            </div>
            <canvas class="topology-context" id="topology-canvas">
              您的浏览器不支持HTML5!
            </canvas>
          </div>
        </div>
        <div class="layui-col-md2">
          <!-- 鼠标悬浮显示节点信息 -->
          <p style="text-align: center;font-size: 14px;padding-top: 20px;">节点名称：</p>
          <p id="node-name" style="text-align: center;font-size: 14px;">（鼠标悬浮节点查看）</p>
          <p style="text-align: center;font-size: 14px;">节点IP：</p>
          <p id="node-ip" style="text-align: center;font-size: 14px;">（鼠标悬浮节点查看）</p>
        </div>
      </div>
    </div>
    <!--Service展示\编辑弹窗-->
    <el-dialog :title="servicesIP + '的服务列表'" :visible.sync="servicesVisitable" width="80vw">
      <host-services-form :ip="servicesIP" ref="serviceTable"></host-services-form>
    </el-dialog>
    <!-- 节点设置编辑弹窗 -->
    <el-dialog title="节点设置" :visible.sync="nodeSettingVisitable" width="50vw">
      <topology-node-set-form :data="currentNodeData" @set="handleSetNodeInfo"></topology-node-set-form>
    </el-dialog>
  </div>
</template>

<script>
import 'jquery'
import '@/static/layui-2.3.0/layui.all'
import {editor} from "@/static/jtopo/js/jtopo-editor";
import '@/static/jtopo/js/util'
import '@/static/jtopo/js/jtopo-0.4.8-dev'
import '@/static/jtopo/js/jtopo-editor'
import HostServicesForm from "@/components/form/HostServicesForm";
import EquipmentAddForm from "@/components/form/EquipmentAddForm";
import TopologyNodeSetForm from "@/components/form/TopologyNodeSetForm";
import {changeNetTopology, deleteEquipment, getNetTopology} from "@/api/topo";
import TopoGenByNetForm from "@/components/form/TopoGenByNetForm";

export default {
  name: "NetworkTopology",
  components: {TopologyNodeSetForm, HostServicesForm, EquipmentAddForm, TopoGenByNetForm},
  data() {
    return {
      editor: editor,
      servicesIP: "",
      servicesVisitable: false,
      ShowEquipmentAddForm: false,
      activeType: "连线",
      needUpdateNodeDrag: true, // 是否需要更新节点拖动事件，每当左侧设备列表更新时，需要将其显式赋为true
      primaryIconList: [],
      EquipmentList: [],
      nodeSettingVisitable: false,
      topoGenVisible: false,
      currentNodeData: {} // 当前节点数据信息
    }
  },
  props: {
    id: { // 目前由vue-router填入
      type: String,
      default: ''
    }
  },
  watch: {
    id(val, old) {
      this.reloadNetTopology() // 监听拓扑图ID变化
    }
  },
  methods: {
    // 加载网络拓扑图和设备列表
    initialNetTopology() {
      getNetTopology(this.id).then(response => {
        this.primaryIconList = response.data.data.ImgList;
        this.EquipmentList = response.data.data.EquipmentList;
        this.needUpdateNodeDrag = true;
        this.editor.init("img/backimg.png", "img/backimg.png", response.data.data.topology_json)
        this.editor.scene.dbclick(this.handleNodeDBClick); // 注册双击事件
      }).catch(response => {
        this.$message.error('error: ' + response.data.msg)
      })
    },
    // 重新加载网络拓扑图
    reloadNetTopology() {
      const loading = this.$loading({lock: true, fullscreen: true})
      getNetTopology(this.id).then(response => {
        this.editor.loadTopologyByJson(response.data.data.topology_json, "img/backimg.png")
        loading.close()
      }).catch(response => {
        loading.close()
        this.$message.error('error: ' + response.data.msg)
      })
    },
    // 保存网络拓扑图
    saveNetTopology(cb = ()=>{}) {
      const loading = this.$loading({lock: true, fullscreen: true})
      let data = this.editor.getSavedTopology()
      changeNetTopology(data, this.id).then(response => {
        this.$message.success("保存成功")
        loading.close()
        cb() // 回调
      }).catch(response => {
        console.log("save error response: ", response)
        loading.close()
        this.$message.error("保存失败")
      })
    },
    // 根据网段生成拓扑成功处理
    topoGenSucc() {
      let r = this.$router.resolve({name: 'topo'})
      window.open(r.href, '_blank')
    },
    // 保存并转跳到指定id拓扑图
    saveAndGotoTopo(id = '') {
      this.saveNetTopology(()=>{ // 在保存成功的回调中转跳
        if(id.length > 0)
          this.$router.push({name: 'topo', params: { id: id}})
        else
          this.$router.push({name: 'topo'})
      })
    },
    // 展示某个Host（节点）的所有服务弹窗
    showHostServices(ip) {
      if(ip === this.servicesIP) { // IP相同时，强制重载
        this.$refs.serviceTable.initialData()
      }
      this.servicesIP = ip
      this.servicesVisitable = true
    },
    // 双击事件处理
    handleNodeDBClick(event) {
      if (event.target instanceof JTopo.TextNode) { // 双击文本框 -> 编辑
        let textfield = $("#jtopo_textfield");
        let e = event.target;
        textfield.css({
          width: e.width + 20,
          top: event.pageY,
          left: event.pageX - e.width/2
        }).show().attr('value', e.text).focus().select();
        textfield.val(e.text);
        textfield[0].JTopoNode = e;
        // 失去焦点后修改文本框
        textfield.blur(function(){
            textfield[0].JTopoNode.text = textfield.hide().val();
        });
      } else if (event.target instanceof JTopo.Node) { // 处理双击节点事件
        if (event.target.nodeType === "TOPOLOGY") { // 子拓扑节点 -> 确认保存并转跳
          this.$confirm('是否保存当前拓扑图，并转跳编辑该子拓扑？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否'
          }).then(() => { // 确认保存并转跳
            this.saveAndGotoTopo(event.target.nodeId)
          }).catch(()=>{})
        } else if (event.target.nodeType === 'UPSTREAM') { // 上层拓扑节点 -> 转跳到上层拓扑图
          this.$confirm('是否保存当前拓扑图，并转跳编辑上层拓扑？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否'
          }).then(() => { // 确认保存并转跳
            this.saveAndGotoTopo(event.target.nodeId)
          }).catch(()=>{})
        }  else if(typeof event.target.id == "string" && event.target.id.length > 0) { // 一般节点 -> 展示服务信息
          this.showHostServices(event.target.id)
        }
      } else if (event.target instanceof JTopo.Link) { // 双击连线事件
        this.editor.currentNode = event.target
      } else { // 双击了舞台空白处
      }
    },
    // 处理点击"节点设置"事件
    handleNodeSetting() {
      let node = this.editor.currentNode
      this.currentNodeData = {
        elementType: node.elementType, // 元素类型 只有为node时显示IP项
        text: node.text, // 文字
        ip: node.id // IP
      }
      this.nodeSettingVisitable = true
    },
    // 处理设置节点完成事件
    handleSetNodeInfo(info) {
      if(!this.editor.currentNode) {
        this.$message.error("设置失败")
      } else { // 设置当前节点信息
        this.editor.currentNode.text = info.text
        this.editor.currentNode.id = info.ip
      }
      this.nodeSettingVisitable = false
    },
    // 显示添加按钮框
    handleEquipmentAdd() {
      this.ShowEquipmentAddForm = true;
    },
    // 新增了设备
    handleNewEquipments(equipments) {
      this.ShowEquipmentAddForm = false;
      this.needUpdateNodeDrag = true;
      this.EquipmentList = equipments;
    },
    // 删除指定名称设备
    handleDeleteEquipment(name) {
      this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 确认删除
        deleteEquipment(name).then(response => {
          this.$message.success("删除成功");
          this.handleNewEquipments(response.data.data.EquipmentList)
        }).catch(response => {
          this.$message.error("删除失败: " + response.data.msg)
        });
      }).catch(()=>{})
    }
  },
  // ！！！！！！！以下勿动！！！！！！！！！半个字母也别动！！！！！！！
  updated() {
    if(this.needUpdateNodeDrag) { // 节点树中每个节点的拖放动作定义给拓扑图编辑器
      const nodes = $("[topo-div-type='topo-node']");
      const nodeLength = nodes.length;
      for (let i = 0; i < nodeLength; i++) {
        const text = $(nodes[i]).find("span").eq(0).text();
        this.editor.drag(nodes[i], document.getElementById('topology-canvas'), text);
      }
      this.needUpdateNodeDrag = false;
    }
  },
  mounted() {
    // 初始化layui
    layui.use('element', function() {
      let element = layui.element
      element.init()
    })

    // 设置canvas画布大小
    let canvas = document.getElementById("topology-canvas");
    canvas.height = ( $(window).height() - $('.layui-header').height() ) * 0.95;

    // 选择连线方式后的css样式
    $("#link-line").click(function () {
      $(this).css("background-color", "darkgray");
      $("#link-foldline-h").css("background-color", "white");
      $("#link-foldline-v").css("background-color", "white");
      $("#link-flexline-h").css("background-color", "white");
      $("#link-flexline-v").css("background-color", "white");
      $("#link-curveline").css("background-color", "white");
    });
    $("#link-foldline-h").click(function () {
      $(this).css("background-color", "darkgray");
      $("#link-line").css("background-color", "white");
      $("#link-foldline-v").css("background-color", "white");
      $("#link-flexline-h").css("background-color", "white");
      $("#link-flexline-v").css("background-color", "white");
      $("#link-curveline").css("background-color", "white");
    });
    $("#link-foldline-v").click(function () {
      $(this).css("background-color", "darkgray");
      $("#link-line").css("background-color", "white");
      $("#link-foldline-h").css("background-color", "white");
      $("#link-flexline-h").css("background-color", "white");
      $("#link-flexline-v").css("background-color", "white");
      $("#link-curveline").css("background-color", "white");
    });
    $("#link-flexline-h").click(function () {
      $(this).css("background-color", "darkgray");
      $("#link-line").css("background-color", "white");
      $("#link-foldline-h").css("background-color", "white");
      $("#link-foldline-v").css("background-color", "white");
      $("#link-flexline-v").css("background-color", "white");
      $("#link-curveline").css("background-color", "white");
    });
    $("#link-flexline-v").click(function () {
      $(this).css("background-color", "darkgray");
      $("#link-line").css("background-color", "white");
      $("#link-foldline-h").css("background-color", "white");
      $("#link-foldline-v").css("background-color", "white");
      $("#link-flexline-h").css("background-color", "white");
      $("#link-curveline").css("background-color", "white");
    });
    $("#link-curveline").click(function () {
      $(this).css("background-color", "darkgray");
      $("#link-line").css("background-color", "white");
      $("#link-foldline-h").css("background-color", "white");
      $("#link-foldline-v").css("background-color", "white");
      $("#link-flexline-h").css("background-color", "white");
      $("#link-flexline-v").css("background-color", "white");
    });

    // 节点右键菜单DOM对象
    this.editor.nodeMenu = $('#node-menu')
    // 连线右键菜单DOM对象
    this.editor.lineMenu = $('#line-menu')
    // 全局右键菜单
    this.editor.mainMenu = $('#main-menu')
    // 布局管理菜单
    this.editor.layoutMenu = $('#layout-menu')
    // 节点文字方向
    this.editor.nodeTextPosMenu = $('#node-text-pos-menu')
    // 节点分组菜单
    this.editor.groupMangeMenu = $('#group-mange-menu')
    // 节点对齐菜单
    this.editor.groupAlignMenu = $('#group-align-menu')
    this.editor.alignGroup = $('#align-group')
    // 分组的容器管理菜单
    this.editor.containerMangeMenu = $('#container-mange-menu')

    // // 节点树中每个节点的拖放动作定义给拓扑图编辑器
    // const nodes = $("[topo-div-type='topo-node']");
    // const nodeLength = nodes.length;
    // for (let i = 0; i < nodeLength; i++) {
    //   const text = $(nodes[i]).find("span").eq(0).text();
    //   this.editor.drag(nodes[i], document.getElementById('topology-canvas'), text);
    // }
    this.editor.saveTopology = this.saveNetTopology // 保持兼容
    this.editor.loadTopology = this.initialNetTopology // 保持兼容
    this.initialNetTopology();
  }
}
</script>

<style>
@import "../static/layui-2.3.0/css/layui.css";
@import "../static/font-awesome-4.7.0/css/font-awesome.min.css";
@import "../static/jtopo/css/jtopo-editor.css";

/* 添加设备按钮样式 */
.equipment-add {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;
  width: 60px;
  height: 40px;
  margin: 10px auto;
}
.equipment-add:hover {
  border-color: #409EFF;
}
.equipment-add-icon {
  font-size: 25px;
  color: #8c939d;
  line-height: 40px;
}

/* 动态设备列表样式 */
.eq-dynamic-table {
  border-collapse:separate;
  border-spacing: 0 4px;
}
.eq-dynamic-line:hover {
  background-color: #f6f6f6;
}
.eq-dynamic-delete {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 2px;
  right: 10px;

  border-radius: 50%;
  height: 15px;
  width: 15px;
  line-height: 15px;
  font-size: 11px;
  padding: 1px;
  text-align: center;

  color: #643537;
  background: #ff4757;
}
.eq-dynamic-delete:before {
  content: "\2716";
}
.eq-dynamic-line:hover .eq-dynamic-delete {
  opacity: 1;
}

/*动态设备列表 滚动条样式*/
.layui-layout .el-scrollbar {
  height: 90vh;
}
.layui-layout .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: hidden;
}

/* 左侧折叠栏样式 */
.eq-collapse .el-collapse-item__header{
  background-color: #f5f5f5 !important; /* 折叠栏标题背景色 */
}
.eq-collapse table {
  margin-top: 20px;
}
.eq-collapse-item-title { /* 折叠栏标题（字）样式 */
  width: 65%;
  text-align: right;
  font-size: 15px;
}
</style>