# 제주여라 모바일 디자인 시스템

제주여라 모바일 앱용 디자인 토큰 + 의존성 없는 HTML/CSS/JS UI 키트와, 이를 보여주는 문서 사이트. 원작업자는 안이슬 팀장(디자이너)이고 planderdev가 이어서 개발한다. 사용법·토큰 설명은 [README.md](README.md) 참고.

## 명령

```sh
python3 -m http.server 8080 --directory dist   # 로컬 실행 (이 맥에는 `python`이 없다. README의 `python`은 동작하지 않음)
npm run check                                  # scripts/validate.mjs 검증
python3 scripts/package-dev-kit.py             # dist/jejuyeora-dev-kit.zip 재생성
```

- 빌드 단계와 npm 의존성이 없다. `npm install` 불필요.
- ES 모듈과 `fetch`로 JSON을 읽기 때문에 `file://`로는 열리지 않는다. 반드시 정적 서버로 실행.
- Claude 미리보기는 `.claude/launch.json`의 `jejuyeora-docs`(포트 8080).

## 구조

`dist/`가 빌드 산출물이 아니라 **소스 그 자체**다. 여기 파일을 직접 수정한다.

| 파일 | 역할 |
| --- | --- |
| `index.html`, `app.js`, `docs.css` | 문서 사이트 셸(사이드바·검색·라우팅·언어/테마 전환). 키트에는 불필요 |
| `mobile-preview.html` | 문서를 모바일 폭 iframe으로 보는 페이지 |
| `foundation-extra.js` | 파운데이션 문서 렌더(`renderFoundation`) |
| `components.js` | 핵심 컴포넌트(`Button`, `Badge`, `Switch`, `Checkbox`, `TextField`, `icon`), `renderComponent`, 오버레이(`useToast`, `useDialog`, `useBottomSheet`), `strings` |
| `components-extra.js` | v1.1 추가 컴포넌트(`renderExtra`, `useSnackbar`, `openDrawer`), `extraStrings` |
| `lucide-icons.js` | 자체 호스팅 Lucide 아이콘 노드 |
| `tokens.css` / `tokens.json` | 디자인 토큰(CSS 변수 `--jy-*`) / 같은 값의 기계 판독용 데이터 |
| `jy-ui.css`, `extensions.css` | 컴포넌트 스타일(기본 / v1.1 추가분) |
| `catalog.json` | 문서 83개의 id·제목·분류·그룹·설명 |
| `*.d.ts` | 공개 함수 타입 선언. 시그니처를 바꾸면 함께 수정 |

`components.js`와 `components-extra.js`는 서로를 import하는 순환 참조다. 모듈 최상위에서 상대 모듈의 값을 바로 쓰지 말 것.

## 지켜야 할 것

- **검증 스크립트의 고정 수치**: `validate.mjs`는 문서 83개(파운데이션 6 / 컴포넌트 73 / 유틸리티 4), 타이포그래피 토큰 20개, 팔레트당 10단계, `--jy-primary:#634bff`, `--jy-bg:#161525`를 단언한다. 문서나 토큰을 추가·삭제하면 스크립트와 README·`index.html`의 숫자도 같이 고친다.
- **3개 언어 동시 수정**: 문자열은 `ko`/`en`/`zh` 키 집합이 완전히 같아야 검증을 통과한다. 하나만 추가하면 실패한다. 중국어는 간체.
- **렌더 결과에 `undefined`·`NaN` 금지**: 모든 컴포넌트가 3개 언어로 렌더되어 검사된다.
- **토큰 이중 관리**: `tokens.css`와 `tokens.json`은 자동 동기화되지 않는다. 값 변경 시 둘 다 수정.
- **zip 갱신**: `dist/` 파일을 고친 커밋에는 `package-dev-kit.py`로 다시 만든 zip을 포함한다. zip은 git에 커밋되어 있고 사이트의 "개발 키트 다운로드"가 가리킨다.
- **외부 의존성 추가 금지**: CDN·npm 패키지·번들러 없이 동작하는 것이 이 키트의 전제다. 폰트·아이콘도 자체 호스팅하며 `fonts/`, `icons/`의 라이선스 파일을 유지한다.
- **다크/라이트 양쪽 확인**: 색은 하드코딩하지 말고 `--jy-*` 시맨틱 토큰을 쓴다. 기본은 다크(`data-theme="dark"`).
- **대상 폭**: 320–540px, 기준 390px. 간격 8px 체계, radius 16/24px.

## 코드 스타일

JS/CSS가 한 줄에 여러 선언을 담은 압축된 형태로 작성되어 있다(파일당 수십 줄, 줄 길이 최대 2,000자). 포매터를 돌려 전체를 다시 정렬하지 말고, 수정할 부분만 기존 형태에 맞춰 고친다. 긴 줄은 파일 전체를 읽기보다 grep으로 위치를 찾는 편이 빠르다.

## Git

- 원격: `planderdev/jejuyeora`, 브랜치는 `main` 하나. 지금까지 커밋은 `main`에 직접 올라갔다.
- 이 저장소의 커밋 계정은 `planderdev`(로컬 설정)다.
- 폴더의 `*.hwpx`(MOU 문서)는 저장소와 무관한 개인 파일이다. 로컬에서만 제외되어 있으니 커밋하지 않는다.
- 과거 커밋에서 외부 디자인 레퍼런스 내용을 의도적으로 제거했다. 타 서비스의 디자인 시스템 문구·자료를 다시 들여오지 않는다.
