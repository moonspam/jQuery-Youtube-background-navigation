# jQuery-Youtube-background-navigation
jQuery plugin that lets you create background videos using youtube api and control navigation.

[YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference)을 이용하여 배경에 영상을 재생해줍니다. 내비게이션 바를 이용하여 영상을 제어 할 수 있습니다.

### 기능
- 영상이 끝나면 다음 영상으로 자동재생(마지막 영상이 끝나면 처음으로 이동)
- 아이콘을 누르면 현재 재생되고 있는 배경을 레이어팝업(Modal dialog box)으로 노출
- 배경영상 음소거 버튼 추가

### Demo
풀페이지 데모 : http://iluku.net/youtube/index.html

높이지정 데모 : http://iluku.net/youtube/index.html?h=600

### 추가설명
#### * 높이지정 방법
> css\ytbgnav.css

    body{height:/* fix here */;
         font-family:tahoma, 'NanumBarunGothic', dotum, sans-serif}

#### * 배경영상을 레이어팝업에 노출 방법
> js\ytbgnav.js

`popID[_curClick]`을 `bgID[_curClick]`으로 변경

    $(".btn_pop").live("click",function() {
        player.pauseVideo();
        $(".pop_yt iframe").attr("src", "https://www.youtube.com/embed/"+ bgID[_curClick] +"?rel=0&amp;autoplay=1;&amp;wmode=opaque");
        $(".pop_yt").show();
        $(".pop_overlay").show();
    });
