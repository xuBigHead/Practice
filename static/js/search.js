function init() {
    var searchText = $("#searchText");
    var hiddenArea = $("#hiddenArea");
    var displayArea = $("#displayArea");
    hiddenArea.hide();
    searchText.bind('input propertychange', function () {
        if (searchText.val() === "mm") {
            hiddenArea.show();
            displayArea.hide();
        } else {
            hiddenArea.hide();
            displayArea.show();
        }
    });
    searchText.keydown(function (event) {
        if (event.which === 13) {
            // if (event.keyCode === 13) {
            var text = $("#searchText").val();
            window.open("https://www.baidu.com/s?wd=" + text);
        }
    });
    $("#googleSearchButton").click(function () {
        var text = $("#searchText").val();
        window.open("https://www.google.com.hk/search?&q=" + text);
    });
    $("#baiduSearchButton").click(function () {
        var text = $("#searchText").val();
        window.open("https://www.baidu.com/s?wd=" + text);
    });
    $("#bingSearchButton").click(function () {
        var text = $("#searchText").val();
        window.open("https://cn.bing.com/search?q=" + text);
    });
    $("#mijisouSearchButton").click(function () {
        var text = $("#searchText").val();
        window.open("https://mijisou.com/?q=" + text);
    });
    $("#bilibiliSearchButton").click(function () {
        var text = $("#searchText").val();
        window.open("https://search.bilibili.com/all?keyword=" + text);
    });
}