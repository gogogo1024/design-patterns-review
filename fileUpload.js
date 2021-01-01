window.external.upload = function (state) {
    console.log(state);
};

// 上传插件
const plugin = (function () {
    const plugin = document.createElement("embed");
    plugin.style.display = 'none';
    plugin.type = 'application/txftn-webkit';
    plugin.sign = function () {
        console.log('开始文件扫描');
    }
    plugin.pause = function () {
        console.log('暂停文件上传');
    }
    plugin.uploading = function () {
        console.log('开始文件上传');
    }
    plugin.del = function () {
        console.log('删除文件上传');
    }
    plugin.done = function () {
        console.log('文件上传完成');
    }
    document.body.appendChild(plugin);
    return plugin;
})();

const Upload = function (fileName) {
    this.plugin = plugin;
    this.fileName = fileName;
    this.button1 = null;
    this.button2 = null;
    this.signState = new SignState(this);
    this.uploadingState = new UploadingState(this);
    this.pauseState = new PauseState(this);
    this.doneState = new DoneState(this);
    this.errorState = new ErrorState(this);
    this.currState = this.signState; // 设置当前状态为扫描状态
};
Upload.prototype.init = function () {
    // const self =this;
    this.dom = document.createElement('div');
    this.dom.innerHTML = '<span>文件名称:' + this.fileName + '</span>\
    <button data-action ="button1">扫描中</button>\
    <button data-action = "button2">删除</button>';
    document.body.appendChild(this.dom);
    this.button1 = this.dom.querySelector('[data-action="button1")');
    this.button2 = this.dom.querySelector('[data-action="button2")');
    this.bindEvent();
}

Upload.prototype.bindEvent = function () {
    const self = this;
    this.button1.onclick = function () {
        self.currState.clickHandler1();
    }
    this.button2.onclick = function () {
        self.currState.clickHandler2();
    }
};

Upload.prototype.sign = function () {
    this.plugin.sign();
    this.currState = this.signState;
};

Upload.prototype.uploading = function () {
    this.button1.innerHTML = '正在上传,点击暂停';
    this.plugin.uploading();
    this.currState = this.signState;
};


Upload.prototype.pause = function () {
    this.button1.innerHTML = '已暂停,点击继续上传';
    this.plugin.pause();
    this.currState = this.pauseState;
};

Upload.prototype.done = function () {
    this.button1.innerHTML = '上传完成';
    this.plugin.done();
    this.currState = this.doneState;
};

Upload.prototype.del = function () {
    this.plugin.dle();
    this.dom.parentNode.removeChild(this.dom);
};
const StateFactory = (function () {
    const State = function () { };
    State.prototype.clickHandler1 = function () {
        throw new Error('子类必须重写父类的clickHandler1方法');
    }
    State.prototype.clickHandler2 = function () {
        throw new Error('子类必须重写父类的clickHandler2方法');
    }
    return function (param) {
        const F = function (uploadObj) {
            this.uploadObj = uploadObj;
        }
        F.prototype = new State();
        for (const i in param) {
            F.prototype[i] = param[i];

        }
        return F;
    }
})()
const SignState = StateFactory({
    clickHandler1:function () {
        console.log('扫描中，点击无效...');
    },
    clickHandler2:function () {
        console.log('文件正在上传中，不能删除');
    }
});
const UploadingState = StateFactory({
    clickHandler1:function () {
        this.uploadObj.pause();
    },
    clickHandler2:function () {
        console.log('文件正在上传中，不能删除');
    }
});
const PauseState = StateFactory({
    clickHandler1:function () {
        this.uploadObj.uploadObj();
    },
    clickHandler2:function () {
        this.uploadObj.del();
    }
});
const DoneState = StateFactory({
    clickHandler1:function () {
        console.log('文件已完成上传，点击无效');
    },
    clickHandler2:function () {
        this.uploadObj.del();
    }
});
const ErrorState = StateFactory({
    clickHandler1:function () {
        console.log('文件上传失败，点击无效');
    },
    clickHandler2:function () {
        this.uploadObj.del();
    }
});

const uploadObj =new Upload('一本书');
uploadObj.init();
window.external.upload =function(state){
    uploadObj[state]();
}

window.external.uploadObj('sign');
setTimeout(function () {
    window.external.upload('uploading');
},2000);

setTimeout(function () {
    window.external.upload('done');
},10000);
