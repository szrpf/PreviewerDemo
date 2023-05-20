/*******************************************************************************
 * 创建: 2023年01月22日
 * 作者: 水煮肉片饭(27185709@qq.com)
 * 描述: 预览器
 *      添加预览器的节点仅供编辑器预览，运行后会自动销毁。
 * 两种模式：
 *      销毁整个节点：销毁节点、子节点、预览器
 *      仅销毁子节点：仅销毁子节点、预览器
 * 使用场景：
 *      UI参照图、动态加载的列表项、动态加载的地图、动态加载的角色等等
*******************************************************************************/
const { ccclass, property, executeInEditMode, menu } = cc._decorator;
enum Mode { 销毁整个节点, 仅销毁子节点 }
@ccclass
@executeInEditMode
@menu('Comp/Previewer')
export default class Previewer extends cc.Component {
    @property({ type: cc.Enum(Mode), displayName: CC_DEV && '模式' })
    private mode = Mode.销毁整个节点;
    protected onLoad() {
        if (CC_EDITOR) {
            this.node['_objFlags'] |= cc.Object['Flags'].LockedInEditor;
            return;
        }
        if (this.mode === Mode.销毁整个节点) {
            this.node.removeFromParent();
            this.node.destroy();
        } else {
            this.node.removeAllChildren();
            this.node.destroyAllChildren();
            this.destroy();
        }
    }

    protected onDestroy() {
        if (CC_EDITOR) {
            this.node['_objFlags'] &= ~cc.Object['Flags'].LockedInEditor;
        }
    }
}