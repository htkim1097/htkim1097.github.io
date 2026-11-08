---
layout: post
title: "Windows 환경에서 Jekyll과 GitHub Pages로 기술 블로그 구축하기"
date: 2026-11-08 16:00:00 +0900
categories:
  - 개발
tags:
  - Jekyll
  - GitHub Pages
  - Ruby
  - Markdown
  - Git
description: "Windows 환경에서 Ruby와 Jekyll을 설치하고 GitHub Pages를 이용해 기술 블로그를 구축한 과정을 정리합니다."
toc: true
---

## 1. 개요

개발 및 기술 학습 내용을 꾸준히 기록하고, 필요할 때 다시 찾아볼 수 있는 개인 기술 블로그를 구축하고자 했다.

기존에는 공부한 내용을 정리하더라도 기록하는 과정에 많은 시간을 사용하거나, 정리한 내용을 다시 찾아보지 않는 경우가 많았다. 이를 개선하기 위해 별도의 복잡한 편집 도구보다는 Markdown을 기반으로 간결하게 작성할 수 있는 블로그 환경을 선택했다.

이번 프로젝트에서는 **Jekyll과 GitHub Pages**를 이용해 별도의 서버 운영 비용 없이 개인 블로그를 구축했다.

### 구축 목표

- Markdown을 이용한 간결한 게시글 작성
- Git을 이용한 버전 관리
- GitHub Pages를 통한 무료 배포
- 카테고리와 태그를 이용한 게시글 분류
- 게시글 검색 및 자동 목차 기능
- 라이트 모드와 다크 모드 지원
- 모바일 환경에서도 읽기 편한 문서형 디자인

### 최종 구성

| 구분 | 사용 기술 |
|---|---|
| 운영체제 | Windows |
| 개발 도구 | Visual Studio Code |
| 정적 사이트 생성기 | Jekyll |
| 실행 환경 | Ruby |
| 패키지 관리 | Bundler |
| 문서 작성 | Markdown |
| 버전 관리 | Git |
| 원격 저장소 | GitHub |
| 배포 | GitHub Pages, GitHub Actions |

---

## 2. Jekyll과 GitHub Pages 이해하기

본격적인 구축에 앞서 사용한 기술의 역할을 정리했다.

### Jekyll

Jekyll은 Markdown이나 HTML로 작성한 문서를 HTML 웹사이트로 변환하는 정적 사이트 생성기다.

게시글을 Markdown으로 작성하면 Jekyll이 레이아웃과 설정을 적용해 실제 웹페이지를 생성한다.

별도의 데이터베이스나 백엔드 서버 없이도 블로그를 운영할 수 있다는 장점이 있다.

### GitHub Pages

GitHub Pages는 GitHub 저장소에 있는 정적 웹사이트를 인터넷에 공개할 수 있는 호스팅 서비스다.

별도의 웹 서버를 직접 구축하지 않아도 되며, GitHub 저장소에 변경 사항을 반영하면 사이트를 배포할 수 있다.

### Ruby와 Bundler

Jekyll은 Ruby 기반으로 동작한다.

- Ruby: Jekyll을 실행하는 프로그래밍 언어 및 실행 환경
- Bundler: 프로젝트에서 사용하는 Ruby 라이브러리와 버전을 관리하는 도구
- Gemfile: 프로젝트에서 필요한 라이브러리를 정의하는 파일
- Gemfile.lock: 실제 설치된 라이브러리의 버전을 기록하는 파일

---

## 3. 개발 환경 구축

### 3.1. Git 설치

먼저 Git을 설치하고 정상적으로 실행되는지 확인했다.

```powershell
git --version
```

설치된 버전을 확인할 수 있다.

### 3.2. Ruby 설치

Jekyll 실행을 위해 Ruby를 설치했다.

설치 후 다음 명령어로 버전을 확인했다.

```powershell
ruby -v
```

당시 설치 환경은 다음과 같다.

```text
Ruby 4.0.9
```

### 3.3. Jekyll 설치

Ruby 설치 후 RubyGems를 이용해 Jekyll과 Bundler를 설치했다.

```powershell
gem install jekyll bundler
```

설치 확인:

```powershell
jekyll -v
bundle -v
```

확인된 버전은 다음과 같다.

```text
Jekyll 4.4.1
```

---

## 4. 프로젝트 생성 및 기본 설정

### 4.1. GitHub 저장소 생성

GitHub에서 다음 이름으로 저장소를 생성했다.

```text
htkim1097.github.io
```

GitHub Pages는 사용자 계정에 해당하는 저장소 이름을 사용하면 별도의 프로젝트 경로 없이 개인 사이트를 운영할 수 있다.

로컬 작업 경로는 다음과 같이 구성했다.

```text
C:\Workspace\Git\htkim1097.github.io
```

### 4.2. 프로젝트 초기화

프로젝트 폴더로 이동한 뒤 Jekyll 프로젝트를 생성했다.

```powershell
cd C:\Workspace\Git\htkim1097.github.io

jekyll new . --force
```

생성된 기본 파일을 확인하고 블로그에 필요한 디렉터리와 레이아웃을 추가했다.

### 4.3. 기본 설정 파일

`_config.yml`은 사이트 전체의 설정을 관리하는 파일이다.

```yaml
title: "나의 노트장"
description: "개발과 기술 학습 기록"
author: "HTKIM"

url: "https://htkim1097.github.io"
baseurl: ""

lang: "ko-KR"
timezone: "Asia/Seoul"

markdown: kramdown
permalink: /:categories/:year/:month/:day/:title/

plugins: []

exclude:
  - Gemfile
  - Gemfile.lock
  - README.md
  - vendor
```

주요 설정의 의미는 다음과 같다.

| 설정 | 설명 |
|---|---|
| title | 블로그 제목 |
| description | 블로그 설명 |
| url | 블로그의 기본 주소 |
| baseurl | 사이트의 하위 경로 |
| lang | 기본 언어 |
| timezone | 시간대 |
| markdown | Markdown 변환 엔진 |
| permalink | 게시글 URL 형식 |
| plugins | 사용할 Jekyll 플러그인 |
| exclude | 사이트 생성에서 제외할 파일 |

`permalink` 설정에 따라 게시글 주소는 카테고리, 작성 날짜, 제목을 기준으로 생성된다.

### 4.4. 디렉터리 구조

기능을 확장하면서 프로젝트 구조를 다음과 같이 구성했다.

```text
htkim1097.github.io/
│
├── _config.yml
├── Gemfile
├── Gemfile.lock
├── index.md
├── categories.md
├── tags.md
├── search.md
├── search.json
│
├── _posts/
│   └── YYYY-MM-DD-post-title.md
│
├── _templates/
│   └── post-template.md
│
├── _layouts/
│   ├── default.html
│   └── post.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── search.js
│   │   ├── toc.js
│   │   └── code-copy.js
│   └── images/
│
└── .github/
    └── workflows/
        └── pages.yml
```

각 디렉터리의 역할은 다음과 같다.

- `_posts`: 실제 게시글을 저장하는 공간
- `_layouts`: 사이트와 게시글의 공통 레이아웃
- `_templates`: 게시글 작성 시 참고할 템플릿
- `assets`: CSS, JavaScript, 이미지 등의 정적 파일
- `.github/workflows`: GitHub Actions 배포 설정

---

## 5. 게시글 작성 방식

Jekyll 게시글은 `_posts` 디렉터리에 Markdown 파일을 생성해 작성한다.

파일 이름은 다음 형식을 사용한다.

```text
YYYY-MM-DD-게시글-제목.md
```

게시글 상단에는 Front Matter라는 YAML 형식의 메타데이터를 작성한다.

```yaml
---
layout: post
title: "게시글 제목"
date: 2026-11-08 16:00:00 +0900
categories:
  - 개발
tags:
  - 기술
  - 학습
description: "게시글의 핵심 내용을 간략하게 설명합니다."
toc: true
---
```

Front Matter에서 지정한 값은 Jekyll이 게시글을 생성할 때 사용한다.

예를 들어 `layout: post`는 게시글 전용 레이아웃을 적용하고, `categories`와 `tags`는 게시글 분류에 활용한다.

본문은 일반적인 Markdown 문법으로 작성하면 된다.

```markdown
## 개요

이번 글에서 다룰 내용을 정리합니다.

## 핵심 개념

기술의 원리와 특징을 기록합니다.

### 세부 내용

추가 설명을 작성합니다.

## 실습

실행한 명령어와 결과를 기록합니다.
```

---

## 6. 로컬 환경에서 실행하기

작성한 블로그가 정상적으로 생성되는지 확인하기 위해 Jekyll 로컬 서버를 실행했다.

프로젝트 루트 디렉터리에서 다음 명령어를 실행한다.

```powershell
bundle exec jekyll serve
```

정상적으로 실행되면 다음과 같은 메시지를 확인할 수 있다.

```text
Configuration file: C:/Workspace/Git/htkim1097.github.io/_config.yml

Source: C:/Workspace/Git/htkim1097.github.io

Destination: C:/Workspace/Git/htkim1097.github.io/_site

Generating... done.

Server address: http://127.0.0.1:4000/
Server running...
```

브라우저에서 다음 주소로 접속하면 로컬 블로그를 확인할 수 있다.

```text
http://127.0.0.1:4000/
```

코드나 설정을 수정한 뒤에는 브라우저에서 변경 사항을 확인할 수 있다.

### 빌드와 실행의 차이

필요에 따라 서버 실행 대신 정적 파일만 생성할 수도 있다.

```powershell
bundle exec jekyll build
```

생성된 결과물은 `_site` 디렉터리에 저장된다.

기존 생성 결과를 삭제하고 새로 빌드하려면 다음 명령어를 사용한다.

```powershell
bundle exec jekyll clean
bundle exec jekyll build
```

---

## 7. GitHub Pages 배포

로컬에서 블로그가 정상적으로 실행되는 것을 확인한 후 GitHub Pages 배포를 설정했다.

### 7.1. GitHub 저장소 연결

Git 저장소에 프로젝트를 추가하고 원격 저장소를 연결한다.

```powershell
git init

git add .

git commit -m "Initial Jekyll blog setup"

git branch -M main

git remote add origin https://github.com/htkim1097/htkim1097.github.io.git

git push -u origin main
```

이미 원격 저장소를 연결한 경우에는 `git remote add origin`을 다시 실행하지 않아도 된다.

### 7.2. GitHub Actions 설정

GitHub Actions를 이용해 사이트를 빌드하고 배포하도록 구성했다.

워크플로 파일은 다음 위치에 저장한다.

```text
.github/workflows/pages.yml
```

이 파일은 GitHub 저장소에 변경 사항이 반영되었을 때 사이트를 빌드하고 GitHub Pages에 배포하는 역할을 한다.

GitHub 저장소의 다음 메뉴에서 배포 방식을 설정한다.

```text
Settings → Pages → Build and deployment
```

Source를 `GitHub Actions`로 변경한다.

### 7.3. 배포 확인

GitHub 저장소의 Actions 메뉴에서 실행 결과를 확인한다.

빌드와 배포 작업이 성공하면 다음 주소에서 블로그에 접속할 수 있다.

https://htkim1097.github.io

이후 게시글을 추가하거나 디자인을 수정한 경우 Git에 변경 사항을 반영하면 GitHub Actions가 다시 배포한다.

```powershell
git add .

git commit -m "Add new post"

git push
```

---

## 8. 구축 과정에서 발생한 문제와 해결

실제 구축 과정에서 발생했던 문제들을 정리했다.

### 8.1. Windows 환경에서 시간대 관련 오류

**문제**

Jekyll 실행 과정에서 시간대(Timezone) 관련 오류가 발생했다.

**원인**

Windows 환경에서 시간대 정보를 처리하기 위한 라이브러리가 필요한 상황이었다.

**해결**

Gemfile에 `tzinfo`와 `tzinfo-data`를 추가하고 Bundler를 이용해 의존성을 설치했다.

```ruby
gem "tzinfo"

gem "tzinfo-data", platforms: %i[windows]
```

이후 다음 명령어를 실행했다.

```powershell
bundle install
```

**정리**

Windows 환경에서 Jekyll을 실행할 때는 시간대 관련 의존성 문제가 발생할 수 있으므로 Gemfile과 Bundler 설정을 확인해야 한다.

### 8.2. `_site` 디렉터리에 index.html이 생성되지 않는 문제

**문제**

Jekyll 서버를 실행했지만 홈페이지의 내용이 정상적으로 표시되지 않았다.

**원인**

`index.md` 파일의 Front Matter 앞에 불필요한 빈 줄이 들어가 있었다.

Jekyll은 Front Matter를 파일의 시작 부분에서 인식하기 때문에 첫 줄에 공백이나 다른 내용이 있으면 메타데이터를 정상적으로 처리하지 못할 수 있다.

**해결**

`index.md`의 첫 줄부터 Front Matter가 시작되도록 수정했다.

수정 전:

```markdown

---
layout: default
title: Home
---
```

수정 후:

```markdown
---
layout: default
title: Home
---
```

이후 Jekyll을 다시 실행하자 홈페이지가 정상적으로 생성되었다.

**정리**

Jekyll에서 Front Matter를 사용하는 파일은 반드시 파일의 첫 부분부터 `---`로 시작하도록 작성해야 한다.

### 8.3. Jekyll이 아닌 다른 로컬 서버가 실행되는 문제

**문제**

처음에는 Jekyll이 생성한 사이트가 아니라 디렉터리 목록이 표시되는 서버 화면을 확인했다.

**원인**

Jekyll 프로젝트 루트에서 실행하는 서버와 일반적인 디렉터리 웹 서버의 동작을 혼동했다.

**해결**

프로젝트 루트 디렉터리로 이동한 뒤 Jekyll 명령어를 명확하게 실행했다.

```powershell
cd C:\Workspace\Git\htkim1097.github.io

bundle exec jekyll serve
```

실행 로그에서 Configuration file, Source, Destination 경로를 확인하면 현재 어떤 프로젝트를 대상으로 실행하고 있는지 파악할 수 있다.

---

## 9. 최종 결과 및 개선 사항

이번 프로젝트를 통해 Windows 환경에서 Jekyll 기반 블로그를 구축하고 GitHub Pages에 배포하는 과정을 경험했다.

초기에는 단순히 Markdown 게시글을 작성하고 공개하는 것을 목표로 했지만, 이후 실제 사용성을 고려해 기능을 확장했다.

### 구현한 기능

| 기능 | 설명 |
|---|---|
| Markdown 게시글 | Markdown으로 기술 문서 작성 |
| 카테고리 | 주제별 게시글 분류 |
| 태그 | 세부 키워드 분류 |
| 검색 | 제목과 본문 기반 검색 |
| 자동 목차 | H2, H3 제목을 이용한 목차 생성 |
| 다크 모드 | 라이트/다크 테마 전환 |
| 코드 복사 | 코드 블록 클립보드 복사 |
| 게시글 이동 | 이전 글 및 다음 글 이동 |
| 반응형 디자인 | 모바일 화면 대응 |

### 향후 개선 방향

- 검색 기능의 정확도와 편의성 개선
- 게시글 목록과 카테고리 화면 개선
- 코드 구문 강조 및 가독성 향상
- 게시글 작성 템플릿 개선
- 이미지와 첨부 자료 관리 방식 정리

---

## 10. 마무리

이번 블로그 구축을 통해 단순히 글을 작성하는 공간을 만드는 것뿐만 아니라, 학습한 내용을 지속적으로 기록하고 관리할 수 있는 환경을 마련했다.

특히 Jekyll의 디렉터리 구조와 Front Matter, Liquid 문법, GitHub Actions를 이용한 배포 과정을 직접 구성하면서 정적 사이트가 생성되고 공개되는 흐름을 이해할 수 있었다.

앞으로는 새로운 기술을 학습하거나 실제 프로젝트를 진행할 때마다 핵심 개념, 실습 과정, 발생한 문제와 해결 방법을 기록할 예정이다.

기록 자체에 많은 시간을 소비하기보다는 나중에 다시 참고했을 때 필요한 내용을 빠르게 찾을 수 있는 실용적인 기술 노트를 만들어 나가는 것이 목표다.

---

## 참고 자료

- [Jekyll 공식 문서](https://jekyllrb.com/docs/)
- [Jekyll 설치 가이드](https://jekyllrb.com/docs/installation/)
- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Markdown 가이드](https://www.markdownguide.org/)