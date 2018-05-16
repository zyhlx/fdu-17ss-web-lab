var firstSelect = document.getElementById("table-create");//第一个select
var questionShow = document.getElementById("show");//条件展示区域
var showPlace = document.getElementById("table-show");//表格展示区域
// var theadCreate = document.getElementById("theadName");
var commit = document.getElementById("commit");//提交
var secondSelect = document.getElementById("table-display");//第二个selcet
var tableList = new Array();
tableList[0] = "";
// var rowList = new Array();


firstSelect.addEventListener("change", checkSelect, false);//下拉框选择事件

secondSelect.addEventListener("change", selectTable, false);//第二个下拉框事件

function checkSelect(e) {
    var evt = e;
    var evtTarget = evt.target;
    switch (evtTarget.options[evtTarget.selectedIndex].value) {
        case "SELECT-ONE":
            normal();
            break;
        case "CREATE-TABLE":
            createTable();
            break;
        case "ADD-ROW":
            addRow();
            break;
        case "DELETE-ROW":
            deleteRow();
            break;
        case "DELETE-TABLE":
            deleteTable();
            break;
    }
}

function normal() {
    questionShow.style.display = 'none';
    commit.style.display = 'none';
}//全部隐藏


//创建表格和表头
function createTable() {
    var name = "";
    var isHead = false;
    var isAttribute = false;
    //用来判断commit是否出现的条件
    questionShow.style.display = 'block';
    questionShow.innerHTML = ' <div>' +
        '        <input type="text" placeholder="Table Name" name="tableName"><input type="number" placeholder="Columns Numbers" name="columnsNumbers">\n' +
        '    </div><div id="theadName"></div>';
    var theadMake = document.getElementById("theadName");


    //列的输入框事件
    questionShow.children[0].children[1].addEventListener("change", function (e) {
        var evt = e;
        var evtTarget = evt.target;
        commit.style.display = 'none';
        isAttribute = false;
        //一旦改变重新判断表头信息来判断commit是否出现
        if (evtTarget.value > 0) {
            theadMake.innerHTML = "";
            isHead = true;
            //添加列
            for (var i = 0; i < evtTarget.value; i++) {
                theadMake.innerHTML = theadMake.innerHTML + '<input type="text" placeholder="Attribute">';
            }
            //给每列输入框绑定事件判断输入是否为空
            for (var i = 0; i < theadMake.children.length; i++) {
                theadMake.children[i].addEventListener("change", function (e) {
                    var evt = e;
                    var evtTarget = evt.target;
                    a:{
                        for (var i = 0; i < theadMake.children.length; i++) {
                            if (theadMake.children[i].value === "") {
                                isAttribute = false;
                                break a;
                            }
                            isAttribute = true;
                        }
                    }
                    //每次输入都判断是否可以出现commit
                    if (isHead && (name !== "") && isAttribute) {
                        commit.style.display = 'inline';
                    } else {
                        commit.style.display = 'none';
                    }
                }, false)
            }
        } else {
            theadMake.innerHTML = "";
        }

        //因为每次改变都会重新生成表头列所以不可能会出现commit但我还是写了判断
        if (isHead && (name !== "") && isAttribute) {
            commit.style.display = 'inline';
        } else {
            commit.style.display = 'none';
        }
    }, false);

    //给标题输入框绑定事件
    questionShow.children[0].children[0].addEventListener("change", function (e) {
        var evt = e;
        var evtTarget = evt.target;
        if (evtTarget.value !== "") {
            name = evtTarget.value;
        } else {
            name = "";
        }
        a:{
            if (theadMake.innerHTML !== "") {
                for (var i = 0; i < theadMake.children.length; i++) {
                    if (theadMake.children[i].value === "") {
                        isAttribute = false;
                        break a;
                    }
                }
                isAttribute = true;
            }
        }
        if (isHead && (name !== "") && isAttribute) {
            commit.style.display = 'inline';
        } else {
            commit.style.display = 'none';
        }
    }, false);

//    commit事件绑定 用onclick可以直接覆盖
    commit.onclick = commitThead;

    function commitThead() {
        secondSelect.innerHTML += '<option selected>' + name + '</option>';
        var tableContent = '';
        for (var i = 0; i < theadMake.children.length; i++) {
            tableContent += '<th>' + theadMake.children[i].value + '</th>';
        }
        //用一个数组去储存数据每一项又是一个数组 期中第一项是thead 第二项是列的个数 第三项又是一个数组每一项是一行这样方便删除
        tableList[secondSelect.options.length - 1] = ['<thead><tr>' + tableContent + '</tr></thead>', theadMake.children.length, new Array()];
        secondSelect.nextElementSibling.innerHTML = '<table><thead><tr>' + tableContent + '</tr></thead></table>';
        secondSelect.nextElementSibling.style.display = 'block';
    }

}


function addRow() {
    questionShow.innerHTML = "";
    var columnNumber = tableList[secondSelect.selectedIndex][1];
    for (var i = 0; i < columnNumber; i++) {
        var th = document.getElementsByTagName("th");
        questionShow.innerHTML += '<input type="text" placeholder="' + th[i].innerText + '">';
    }
    commit.onclick = commitAddRow;

    function commitAddRow() {
        var rowContent = '';
        var columnNumber = tableList[secondSelect.selectedIndex][1];
        for (var i = 0; i < columnNumber; i++) {
            if (questionShow.children.length > i) {
                rowContent += '<td>' + questionShow.children[i].value + '</td>'
            } else {
                rowContent += '<td></td>'
            }
        }
        // rowList[rowList.length] = '<tr>'+rowContent+'</tr>';
        // tableList[secondSelect.selectedIndex][2] = rowList;
        tableList[secondSelect.selectedIndex][2][tableList[secondSelect.selectedIndex][2].length] = '<tr>' + rowContent + '</tr>';
        var bodyContent = '';
        for (let j = 0; j < tableList[secondSelect.selectedIndex][2].length; j++) {
            bodyContent += tableList[secondSelect.selectedIndex][2][j];
        }
        showPlace.innerHTML = '<table>' + tableList[secondSelect.selectedIndex][0] + '<tbody>' + bodyContent + '</tbody>' + '</table>';
    }
}


//选中表格
function selectTable(e) {
    showTable();
}

//删除行
function deleteRow() {
    //当行数大于0时才可以删除
    if (tableList[secondSelect.selectedIndex][2].length > 0) {

        questionShow.innerHTML = '';
        //按列数创建输入框
        for (var i = 0; i < tableList[secondSelect.selectedIndex][1]; i++) {
            var th = document.getElementsByTagName("th");
            questionShow.innerHTML += '<input type="text" placeholder="' + th[i].innerText + '">';
        }
        commit.onclick = commitDeleteRow;

        function commitDeleteRow() {
            //记录删除的行
            var rowToRelete = new Array();
            //会多一行表头
            var tr = document.getElementsByTagName("tr");

            //先看行
            for (var j = 0; j < tableList[secondSelect.selectedIndex][2].length; j++) {
                b:{
                    //再比较每格 用列
                    for (var k = 0; k < th.length; k++) {
                        if (questionShow.children[k].value !== "") {
                            //tr从第二行开始
                            if (questionShow.children[k].value !== tr[j + 1].children[k].innerHTML) {
                                break b;
                            }
                        }
                    }
                    rowToRelete[rowToRelete.length] = j;
                }
            }
            //删除时每次删都会使数组变化，但幸运的是行序号是由小到大的可以消除误差
            for (var l = 0; l < rowToRelete.length; l++) {
                tableList[secondSelect.selectedIndex][2].splice(rowToRelete[l] - l, 1)
            }
            showTable();
        }
    }
}

function showTable() {
    if (secondSelect.selectedIndex !== 0) {
        if (tableList[secondSelect.selectedIndex][2] !== "") {
            var bodyContent = '';
            for (let j = 0; j < tableList[secondSelect.selectedIndex][2].length; j++) {
                bodyContent += tableList[secondSelect.selectedIndex][2][j];
            }
            showPlace.innerHTML = '';
            showPlace.innerHTML = '<table>' + tableList[secondSelect.selectedIndex][0] + '<tbody>' + bodyContent + '</tbody>' + '</table>'
        } else {
            showPlace.innerHTML = '';
            showPlace.innerHTML = '<table>' + tableList[secondSelect.selectedIndex][0] + '</table>';
        }
    } else {
        showPlace.innerHTML = '';
    }
}

function deleteTable() {
    questionShow.innerHTML = "<div>WARNING: You cannot undo this action!</div>";
    commit.style.display = 'block';
    commit.onclick =commitDeleteTable;
    function commitDeleteTable() {
        if (secondSelect.selectedIndex !== 0) {
            //修正selectoption的序号和存储数组的映射
            tableList.splice(secondSelect.selectedIndex-1,1);
            //下拉框里也要删除
            secondSelect.options.remove(secondSelect.selectedIndex);
            if(secondSelect.options.length >= 2){
                secondSelect.options[1].selected = true;
            }else {
                secondSelect.options[0].selected = true;
            }
        }
        showTable();
    }
}
