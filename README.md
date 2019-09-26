# viz plugin generate 하는 법
1. 플러그인 폴더를 생성합니다.
    ```
    mkdir folder이름
    ```
2. `package.json` 파일을 생성합니다.
- package.json은 프로젝트의 의존성을 관리하는 문서입니다.
- package.json에 의존성을 명시하면 npm install 명령어로 패키지를 한번에 설치할 수 있습니다.
- json 형싱으로 작성합니다.
- name과 버전을 명시합니다.
- npm으로 패키지를 설치하려면 dependencies를 추가합니다.
- 예시
   ```
    {
        "name": "pivot_table",
        "version": "kibana",
        "dependencies": {
            "jquery": "^3.4.1",
            "jqueryui": "^1.11.1",
            "pivottable": "^2.23.0"
        }
    }
   ```
- [package.json](https://heropy.blog/2018/02/18/node-js-npm/)에 대해 자세히 알고 싶으면 다음을 참고하세요.
   
3. index.js 파일을 생성합니다.
- index.js은 처음 접근하는 뷰입니다.
- return을 kibana.Plugin으로 합니다.
- 속성을 `exportui`으로 하고, visualize에 플러그인을 추가하고 싶은 경우에는 `visTypes`으로 유형을 정해줍니다.
- VisType에는 실행할 js를 명시합니다.
- 더 많은 속성은 [공식 문서](https://www.elastic.co/guide/en/kibana/current/development-uiexports.html)를 참고합니다.
    ```
    export default function (kibana) {

    return new kibana.Plugin({
        uiExports: {
        visTypes: [
            'plugins/pivot_table/vis'
        ]
        }
    });
    }
    ```
4. viz.js 파일을 생성합니다.
- viz.js에서는 vizFactory를 생성하고 기본 Visualization을 작성합니다.
- VisTypesRegistryProvider을 리턴해야합니다.(import ui/registry/vis_types)
- vizFactory를 사용하기 위해서는 해당 모듈을 import 해야합니다.(import ui/vis/vis_factory)
- 사용할 수 있는 파라미터는 이름, 타이틀, 설명, visConfig, editorConfig 등 입니다.
- visualization에 실제로 보여줄 ui의 파일 이름을 작성해 줍니다.
- 자세한 내용은 [공식 사이트](https://www.elastic.co/guide/en/kibana/master/development-visualization-factory.html)를 참고합니다.

    ```
    import { VisFactoryProvider } from 'ui/vis/vis_factory';
    import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
    import { VisController } from './vis_controller';

    function TestVisProvider(Private) {
    const VisFactory = Private(VisFactoryProvider);

    return VisFactory.createBaseVisualization(
        {
            name: 'pivot_table',
            title: 'Pivot Table',
            icon: 'list',
            visualization: VisController
            // 필요한 코드 작성
        });
    }
    VisTypesRegistryProvider.register(TestVisProvider);
    ```
5. vis_controller.js 파일을 생성합니다.
- VisController 클래스를 작성합니다.
- 마지막에 export를 해줍니다.
- 필요한 모듈이 있으면 npm install을 하고 맨 위에 import를 시켜줍니다.
  ```
    import jQuery from 'jquery';
    import 'jqueryui';
    import 'pivottable';

    class VisController {

    render(visData, status) {
        return new Promise(resolve => {
        resolve('when done rendering');
        });
    }
    };

    export { VisController };
  ```
  6. 폴더 구조는 다음과 같습니다.
    ```
    ├── README.md
    ├── index.js
    ├── node_modules
    │   ├── @elastic
    │   ├── @kbn
    │   └── pivottable
    │       ├── LICENSE.md
    │       ├── README.md
    │       ├── dist
    │       │   ├── c3_renderers.js
    │       │   └── tips_data.min.js
    │       └── package.json
    ├── package-lock.json
    ├── package.json
    └── public
        ├── data.json
        ├── options_template.html
        ├── vis.js
        ├── vis.less
        └── vis_controller.js
    ```

# Visualization Facotry
`Visualization`을 사용하여 새로운 Visualization을 생성합니다. `VisTypesRegistryProvider`로 시각화를 `register`합니다.
```
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';

const MyNewVisType = (Private) => {
  const VisFactory = Private(VisFactoryProvider);

  return  VisFactory.createBaseVisualization({
    name: 'my_new_vis',
    title: 'My New Vis',
    icon: 'my_icon',
    description: 'Cool new chart',
    ...
  });
}

Vis TypesRegistryProvider.register(MyNewVisType);  
```
createBaseVisualization 메서드의 매개변수로 아래를 사용할 수 있습니다. 
- name: vis name, unique, 소문자와 밑줄만 가능
- title: kibana에서 보여줄 title
- icon: kibana에서 보여줄 아이콘, [EUI Icon](https://elastic.github.io/eui/#/display/icons)
- image: icon 대신 image도 사용 가능
- description: kibana에 표시된 시각화 설명
- hidden(bool, default:false): 숨기기
- visConfig: 시각화 매개변수를 보유한 객체
- visConfig.defaults: 기본 시각화 구성을 유지하는 객체
- `visualization`: vis를 위한 생성자 함수가 존재하는 곳
- requestHandler: 요청 핸들러
- responseHandler: 응답 핸들러
- editor: 사용자 정의 편집기를 위한 editor 클래스
- `editorConfig`: 에디터 파라미터를 보관 유지하는 객체
- options.showTimePicker(bool, default:true): 시간 선택기를 표시하거나 숨김
- options.showQueryBar(bool, default:true): 쿼리 표시줄 표시하거나 숨김
- options.showFilterBar(bool, default:true): 필터 막대 표시하거나 숨김
- `options.showIndexSelection(bool, default:true)`: 인덱스 선택 표시하거나 숨김
- stage: experimental, 고급에서 시각화 활성화 비활성화 가능
- feedbackMessage: 

## Base Visualization Type
visualization에는 생성자 함수, render method 및 정리를 위해 호출되는 파괴 메소드가 있는 유형을 제공해야합니다.
```
class VisController {
  constructor(el, vis) {
      this.el = el;
      this.vis = vis;
  }

  destroy() {
  }

  async render(visData, status) {
      return 'done rendering';
  }
};
```
## React Visualization Type
```
import { ReactComponent } from './my_react_component';

const MyNewVisType = (Private) => {
  const VisFactory = Private(VisFactoryProvider);

  return VisFactory.createReactVisualization({
    name: 'my_new_vis',
    title: 'My New Vis',
    icon: 'my_icon',
    description: 'Cool new chart',
    visConfig: {
       component: ReactComponent
    }
  });
}
```

# Visualization Editors
기본적으로 시각화는 default 편집기를 사용합니다. 이것은 많은 kibana 시각화에서 볼 수 있는 사이드바 편집기입니다.

