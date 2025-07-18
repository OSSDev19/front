# AI 기반 의료·약품 정보 검증 시스템

이 프로젝트는 사용자가 웹 페이지에서 드래그한 의료 또는 약품 관련 텍스트 정보의 신뢰도를 검증해주는 Chrome 확장 프로그램입니다. 부정확하거나 검증되지 않은 정보로부터 사용자를 보호하는 것을 목표로 합니다.

## ✨ 주요 기능

-   **텍스트 드래그 감지:** 웹 페이지의 어떤 텍스트든 드래그하여 선택하면, 그 위치에 '검증' 버튼이 나타납니다.
-   **실시간 정보 검증:** '검증' 버튼을 클릭하면, AI 모델(현재는 시뮬레이션)이 선택된 텍스트의 신뢰도를 분석하여 결과를 보여줍니다.
-   **직관적인 결과 표시:** 검증 결과는 '신뢰할 수 있는 정보' 또는 '주의가 필요한 정보' 와 같이 명확하고 이해하기 쉬운 UI로 제공됩니다.
-   **세련된 UI/UX:** 사용자가 편리하게 사용할 수 있도록 세련된 말풍선 디자인의 팝업과 부드러운 애니메이션 효과를 적용했습니다.

## 🚀 설치 및 실행 방법

로컬 환경에서 이 확장 프로그램을 테스트하려면 다음 단계를 따르세요.

1.  이 저장소를 로컬 컴퓨터에 복제(clone)하거나 다운로드합니다.
2.  Chrome 브라우저를 열고 주소창에 `chrome://extensions`를 입력하여 확장 프로그램 관리 페이지로 이동합니다.
3.  페이지 오른쪽 상단에 있는 **'개발자 모드(Developer mode)'** 스위치를 켭니다.
4.  왼쪽 상단에 나타나는 **'압축 해제된 확장 프로그램을 로드합니다(Load unpacked)'** 버튼을 클릭합니다.
5.  파일 탐색기가 열리면, 이 프로젝트의 **`front/build`** 폴더를 선택하고 '열기'를 클릭합니다.
6.  이제 확장 프로그램이 설치되었으며, 웹 페이지에서 텍스트를 드래그하여 기능을 테스트할 수 있습니다.

> **⚠️ 주의:** 코드를 수정한 후에는 반드시 확장 프로그램 관리 페이지(`chrome://extensions`)에서 새로고침 아이콘을 클릭하거나, 확장 프로그램을 삭제 후 다시 로드해야 변경사항이 적용됩니다.

## 📁 프로젝트 구조

```
front/
├── public/
│   ├── content.js      # 웹 페이지에 직접 주입되어 DOM과 상호작용하는 핵심 스크립트
│   ├── popup.css       # '검증' 버튼 및 결과 창의 스타일을 정의하는 CSS 파일
│   ├── manifest.json   # 확장 프로그램의 설정과 권한을 정의하는 파일
│   └── index.html      # 확장 프로그램의 기본 팝업 HTML (현재는 직접 사용되지 않음)
│
└── src/
    ├── App.js          # React 애플리케이션의 메인 컴포넌트
    └── index.js        # React 애플리케이션의 진입점
```

-   **`public`**: 확장 프로그램의 핵심 로직과 정적 파일들이 위치합니다.
    -   `content.js`: 사용자의 텍스트 선택을 감지하고, 팝업 UI를 생성하며, 모든 상호작용을 처리합니다.
    -   `popup.css`: 팝업과 결과 창의 모든 시각적 요소를 제어합니다.
    -   `manifest.json`: 확장 프로그램의 이름, 버전, 권한, 콘텐츠 스크립트 등을 정의하는 가장 중요한 설정 파일입니다.
-   **`src`**: Create React App으로 생성된 기본 파일들이 포함되어 있습니다. 현재 핵심 기능은 `public` 폴더 내의 파일들로 구현되고 있습니다.
