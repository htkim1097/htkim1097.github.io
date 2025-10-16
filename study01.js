// Three.js 로드
import * as THREE from 'three';

// CDN 사용 예시
// three.module.js의 경로는 /build/three.module.js 여야 함.
// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@<version>/build/three.module.js';

// Three js의 모듈 구조는 
// someFolder - build - three.module.js
//            - addons - controls - OrbitControls.js
// 이런식으로 되어있어야 자동으로 서로 참조 가능함.


function main() {
    // c라는 id의 캔버스 객체를 가져옴.
    const canvas = document.querySelector("#c");
    // 지정한 캔버스에 렌더링. canvas를 지정하지 않고 동적으로 자동으로 생성되는 캔버스를 document에 넣을 수 있음
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

    // 원근 카메라 생성
    const fov = 75;     // field of view(시야각) 수직면 75도로 설정(원근 카메라만 degree 사용, 나머지는 radian 사용)
    const aspect = 2;   // 가로 세로 비율(캔버스 기본 설정 크기가 300x150이라서 300/150=2를 설정)
    const near = 0.1;   // 카메라 앞에 렌더링 되는 공간 범위. 이 공간을 넘어간 요소는 렌더링 되지 않음
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // 카메라 위치 설정
    camera.position.z = 2;

    // Scene 객체 생성
    const scene = new THREE.Scene();

    // 광원 생성
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);   // 카메라의 위치 값
    scene.add(light);
    
    // 정육면체를 만들기 위한 정점 데이터와 geometry
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // metarial 생성
    //const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // 광원에 반응하지 않음
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88})

    // Mesh 생성(Meah는 Geometry, Meterial 외에도 물체의 크기, 위치, 방향을 담은 객체)
    // const cube = new THREE.Mesh(geometry, material);

    // Scene 객체에 Mesh 객체를 넣음
    // scene.add(cube);

    // 렌더링
    renderer.render(scene, camera);

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844, 2),
    ]

    // canvas의 원본 크기와 CSS로 지정한 크기(clientWidth, clientHeight)를 비교해 원본 크기를 변경할지 결정하는 함수
    // canvas의 크기를 키웠을 때 렌더링된 물체가 해상도가 안맞아 뿌옇게 보이는 것을 방지.
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;

        // 일반 디스플레이 보다 몇 배 더 높은 고해상도 스마트폰은 배수의 제곱만큼 더 렌더링해야 함.
        // 그래서 이 고해상도를 다 렌더링 하기보다 브라우저로부터 CSS 픽셀과 실제 기기의 픽셀 배율을 곱해서 CSS 픽셀만큼만 렌더링
        const pixelRatio = window.devicePixelRatio;  
        const width = Math.floor(canvas.clientWidth * pixelRatio);
        const height = Math.floor(canvas.clientHeight * pixelRatio);

        // 가로 세로 중 하나라도 다르면 사이즈 변경
        const needResize = canvas.width !== width || canvas.height !== height;

        // 캔버스의 리사이징은 화면을 다시 렌더링해야 하므로 같은 사이즈일 때는 리사이징 하지 않고 성능 절약.
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    // requestAnimationFrame은 매개변수로 넘겨 받은 함수로 페이지가 로드된 이후의 시간값을 밀리초 단위로 넘겨줌
    function render(time) {
        time *= 0.001;  // 밀리초를 초단위로 변환

        // canvas의 비율이 변하려면 canvas의 사이즈가 변해야 하므로, true를 반환했을 때만 카메라의 비율을 변경
        if (resizeRendererToDisplaySize(renderer)){
            // 동적으로 카메라의 aspect(비율) 속성을 canvas의 화면 크기에 맞춤.
            // 이렇게 해야 화면 크기가 변해도 렌더링 되는 물체의 비율이 일정.
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = time * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        // 브라우저에 애니메이션 프레임을 요청하는 함수
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main()