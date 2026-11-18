# 제주여라 모바일 디자인 시스템

TDS Mobile의 파운데이션·컴포넌트·유틸리티 **전체 63개 문서 항목**과 LINE LDSG 공개 문서 41개의 대조 결과을 기준으로 만든 제주여라용 문서와 독립적인 HTML/CSS/JavaScript UI 구현입니다.

- Primary: `#634BFF`
- 기본 다크 배경: `#161525` / 라이트 모드 제공
- 언어: `ko`, `en`, `zh` (중국어 간체)
- 한·영문: Pretendard Variable / 중국어: Noto Sans SC
- 모바일 대상: 320–540px, 기본 예제 390px
- 8px 간격 체계, 16/24px radius

## 실행

빌드와 npm 설치 없이 정적 서버로 실행합니다.

```sh
python -m http.server 8080 --directory dist
```

브라우저에서 `http://localhost:8080`을 엽니다. ES 모듈과 JSON 로딩 때문에 파일을 더블클릭하는 `file://` 실행은 지원하지 않습니다.

## 앱에 적용

`dist/tokens.css`, `dist/jy-ui.css`, `dist/extensions.css`, `dist/components.js`, `dist/components-extra.js`, `dist/lucide-icons.js`, `dist/components.d.ts`, `dist/fonts/`, `dist/icons/`, `dist/media/`를 같은 디렉터리 구조로 복사합니다.

```html
<html lang="ko" data-theme="dark">
<link rel="stylesheet" href="./tokens.css">
<link rel="stylesheet" href="./jy-ui.css">
<link rel="stylesheet" href="./extensions.css">
<div id="app"></div>
<script type="module">
  import { Button, TextField, mountInteractions } from './components.js';
  const root = document.querySelector('#app');
  root.innerHTML = TextField('이름', { placeholder: '이름을 입력해 주세요' })
    + Button('제주 둘러보기', { display: 'block' });
  mountInteractions(root);
</script>
```

직접 조합할 수 있는 함수는 `Button`, `Badge`, `Switch`, `Checkbox`, `TextField`, `icon`입니다. 다른 항목은 문서의 HTML 탭에서 예제 마크업을 복사하고 서비스 데이터와 이벤트를 연결합니다. `renderComponent(id, {lang, variant})`는 카탈로그용 예제 생성 함수입니다. `mountInteractions`는 저장 토스트, 예시 검색 결과 등 문서 예제용 동작을 연결하므로 실제 서비스에서는 필요한 이벤트 핸들러로 교체합니다.

### 모드와 언어

```js
document.documentElement.dataset.theme = 'light'; // dark | light
document.documentElement.lang = 'zh'; // ko | en | zh
```

중국어는 간체 Noto Sans SC를 사용합니다. 중국어 번체가 필요한 경우 Noto Sans TC와 별도의 번역 리소스를 추가하세요. 폰트는 포함된 파일을 자체 호스팅하며 OFL 라이선스를 `fonts/`에 포함합니다.

### 오버레이 유틸리티

```js
import { useDialog, useToast, useBottomSheet } from './components.js';

const confirmed = await useDialog({
  title: '저장한 장소를 삭제할까요?',
  description: '삭제한 장소는 다시 저장할 수 있어요.',
  cancelLabel: '취소', confirmLabel: '삭제', lang: 'ko'
});
if (confirmed) useToast('삭제했어요');

useBottomSheet({
  title: '지역 선택', options: ['제주 동쪽', '제주 서쪽', '서귀포'],
  lang: 'ko', onSelect: value => console.log(value)
});
```

네이티브 `<dialog>`를 사용합니다. 앱 웹뷰의 `HTMLDialogElement.showModal` 지원을 확인하세요. 필요 시 서비스의 오버레이 포털에 같은 마크업과 토큰을 적용합니다. 버튼·입력 레이블·포커스·탭 키보드 이동·감소된 모션 설정이 포함됩니다.

### 토큰

`tokens.css`는 프리미티브 팔레트, 모드별 시맨틱 컬러, 간격, radius, rem 기반 타이포그래피 토큰을 포함합니다. `tokens.json`은 팔레트·언어·20개 원문 타이포그래피 토큰·iOS 및 Android 큰 글자 수치의 기계 판독용 데이터입니다.

```css
.my-card {
  background: var(--jy-surface);
  color: var(--jy-text);
  border: 1px solid var(--jy-border);
  border-radius: var(--jy-radius);
  padding: var(--jy-space-3);
}
.my-title {
  font-size: var(--jy-t3-size);
  line-height: var(--jy-t3-line);
}
```

## v1.1.1 메뉴 정리

추가 문서를 파운데이션·컴포넌트·유틸리티의 기존 분류에 통합했습니다. 각 분류는 이름순으로 정렬하고 Agreement, Asset, BottomCTA, Dialog, TextField 등 실제 컴포넌트 계열의 하위 문서 관계는 유지합니다. 사이드바·검색 결과·이전/다음 탐색이 같은 순서를 사용합니다.

## v1.1 보강 사항

- 문서 총 83개: 파운데이션 6개, 컴포넌트 문서 73개, 유틸리티 4개.
- Layout, Iconography, Object Styles, Design Tokens 문서를 추가했습니다.
- Avatar, Tag, Radio Button, Chip, Pulldown, Snackbar, FAB, Top/Bottom Navigation, Page Indicator/Controller, Image Grid, Video Player, Side Drawer, Footer, Expanded Tab List를 추가했습니다.
- 기존 Badge 알림 표시, Checkbox 부분 선택·오류, Button 아이콘·아웃라인, Slider 범위 입력, 입력란·텍스트 영역 상태를 보강했습니다.
- 모든 UI 아이콘은 Lucide Static 1.75.0(ISC)의 실제 SVG 노드를 자체 호스팅합니다. `icons/LUCIDE-LICENSE.txt`를 배포 시 유지하세요.
- 셀렉트는 네이티브 선택 동작을 유지하며 기본 화살표를 제거하고 Lucide ChevronDown으로 표시합니다.
- 페이지별 아이브로우를 제거하고, 메뉴 이동 후 사이드바 스크롤 위치를 보존합니다.
- `reference-audit.json`은 LINE 공개 문서 41개 각각의 반영 위치와 판단, 검토한 절 제목을 담습니다. LINE 전용 LIFF View는 적용하지 않습니다.

추가 UI 스타일에는 `extensions.css`가 필요합니다. `components.js`는 `components-extra.js`와 `lucide-icons.js`를 가져오므로 세 파일을 함께 유지하세요. 이미지/영상 예제는 `media/`를 함께 복사하세요. SVG는 예시 일러스트이며 실제 여행지 사진은 아닙니다.

```js
import { useSnackbar, openDrawer } from './components-extra.js';
useSnackbar('저장했어요', {
  actionLabel: '실행 취소',
  onAction: () => console.log('Restore the previous state')
});
openDrawer({ lang: 'ko', profile: true });
```

비디오 플레이어는 Lucide 컨트롤과 HTML5 `<video>`를 사용합니다. 예제 영상은 MDN의 CC0 flower.mp4이며 출처는 `media/MEDIA-CREDITS.txt`에 있습니다. 재생·탐색·음소거·자막과 Fullscreen API를 제공합니다. 플랫폼이 Fullscreen API를 제한하면 해당 앱의 네이티브 전체 화면 처리로 연결하세요.

## 포함 범위와 참조

`catalog.json`에 파운데이션 2개, 컴포넌트 문서 57개, 유틸리티 문서 4개의 원문 URL·속성 이름·타입·기본값·예제 이름을 기록했습니다. 상위 그룹과 V3/V4 및 Legacy 문서도 유지합니다. 파운데이션의 기본 팔레트와 타이포그래피 수치는 원문을 따르고, Primary와 시맨틱 컬러는 제주여라 기준입니다.

문서의 **원문 API 레퍼런스**는 참고 정보입니다. 이 개발 키트는 `@toss/tds-mobile`의 소스나 패키지를 포함하지 않고, TDS React API와 드롭인 호환되지 않습니다. 모든 원문 예제·Lottie·앱브릿지·영상·네이티브 보안 입력 로직까지 구현한 것은 아닙니다. Full Secure Keypad는 마스킹된 UI 예제로, 실제 보안 입력에 사용하지 마세요.

참조: https://tossmini-docs.toss.im/tds-mobile/

보강 참고: https://designsystem.line.me/LDSG/foundation/overview-en/

두 가이드 모두 2026-11-18 확인. LINE의 시각 스타일 대신 제주여라의 보라색·다크 기본 테마·8px 간격·16/24px radius를 적용했습니다.

© Plander Designer ASEUL
