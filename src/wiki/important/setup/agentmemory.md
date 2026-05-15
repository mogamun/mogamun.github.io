---
title: agentmemory 설정
created: 2026-05-12
updated: 2026-05-12
tags: [important, setup-guide, ai-agent, memory, mcp, claude-code]
sources: [2026-05-12-agentmemory.md]
status: stable
category: important
---

# agentmemory 설정

## 개요
AI 코딩 에이전트를 위한 영구 메모리 시스템. 세션 간 기억을 유지하고, 12 hooks로 자동 캡처, BM25+Vector+Graph 하이브리드 검색으로 관련 컨텍스트 주입.

## 전제 조건
- Node.js >= 20
- iii engine 또는 Docker (선택)

## 설치 단계

### Step 1: 메모리 서버 시작

```bash
npx @agentmemory/agentmemory
```

별도 터미널에서 실행. 서버가 localhost:3111에 바인딩.

### Step 2: 데모 실행 (선택)

```bash
npx @agentmemory/agentmemory demo
```

3개 세션(JWT auth, N+1 query fix, rate limiting) 시드 → 시맨틱 검색 데모. http://localhost:3113에서 실시간 뷰어 확인.

### Step 3: 에이전트별 설정

#### Claude Code

```bash
/plugin marketplace add rohitg00/agentmemory
/plugin install agentmemory
```

플러그인이 12 hooks, 4 skills, MCP 서버를 자동 등록. 확인:
```bash
curl http://localhost:3111/agentmemory/health
```

#### Cursor

`~/.cursor/mcp.json`에 추가:
```json
{
  "mcpServers": {
    "agentmemory": {
      "command": "npx",
      "args": ["-y", "@agentmemory/mcp"]
    }
  }
}
```

#### Gemini CLI

```bash
gemini mcp add agentmemory npx -y @agentmemory/mcp --scope user
```

#### Codex CLI

```bash
codex mcp add agentmemory -- npx -y @agentmemory/mcp
```

#### OpenCode

`opencode.json`에 추가:
```json
{
  "mcp": {
    "agentmemory": {
      "type": "local",
      "command": ["npx", "-y", "@agentmemory/mcp"],
      "enabled": true
    }
  }
}
```

#### Hermes Agent

`~/.hermes/config.yaml`에 추가:
```yaml
mcp_servers:
  agentmemory:
    command: npx
    args: ["-y", "@agentmemory/mcp"]
memory:
  provider: agentmemory
```

#### Pi

```bash
cp -r integrations/pi ~/.pi/agent/extensions/agentmemory
# pi 재시작
```

#### Standalone MCP (engine 없이)

```bash
npx -y @agentmemory/agentmemory mcp
# 또는
npx -y @agentmemory/mcp
```

### Step 4: 환경 설정 (선택)

`~/.agentmemory/.env` 생성:

```bash
# LLM provider (기본: no-op, LLM 압축 비활성화)
# ANTHROPIC_API_KEY=sk-ant-...

# 임베딩 (기본: 로컬 all-MiniLM-L6-v2, 무료)
# EMBEDDING_PROVIDER=local

# 검색 튜닝
# BM25_WEIGHT=0.4
# VECTOR_WEIGHT=0.6
# TOKEN_BUDGET=2000

# 인증
# AGENTMEMORY_SECRET=your-secret

# 툴 가시성
# AGENTMEMORY_TOOLS=all  (기본: core, 8개만)
```

### Step 5: iii engine 설치 (선택, REST/Viewer 필요 시)

**macOS arm64:**
```bash
mkdir -p ~/.local/bin && curl -fsSL https://github.com/iii-hq/iii/releases/download/iii/v0.11.2/iii-aarch64-apple-darwin.tar.gz | tar -xz -C ~/.local/bin && chmod +x ~/.local/bin/iii
```

**Linux x64:** `aarch64-apple-darwin` → `x86_64-unknown-linux-gnu`

### Step 6: 기존 Claude Code 세션 가져오기 (선택)

```bash
# 기본 경로의 모든 JSONL import
npx @agentmemory/agentmemory import-jsonl

# 특정 파일 import
npx @agentmemory/agentmemory import-jsonl ~/.claude/projects/-my-project/abc123.jsonl
```

### Step 7: iii Console (선택)

```bash
iii console --port 3114
```

http://localhost:3114에서 OTEL traces, KV 브라우저, 함수 호출, 스트림 모니터링.

## 시놀로지 Docker(Container Manager) 배포 가이드

> 대상: DSM 7.x + Container Manager

### 1) 사전 준비

- 패키지 센터에서 **Container Manager** 설치
- SSH 활성화(제어판 → 터미널 및 SNMP) 후 NAS 접속
- 프로젝트 경로 생성

```bash
mkdir -p /volume1/docker/agentmemory
```

### 2) 환경변수 파일 생성

`/volume1/docker/agentmemory/.env`

```bash
# 외부 노출 시 반드시 설정
AGENTMEMORY_SECRET=change-this-secret

# 필요 시만 활성화
# AGENTMEMORY_TOOLS=all
# AGENTMEMORY_AUTO_COMPRESS=false
```

### 3) docker-compose 작성

`/volume1/docker/agentmemory/docker-compose.yml`

```yaml
services:
  agentmemory:
    image: node:20-alpine
    container_name: agentmemory
    working_dir: /app
    command: sh -c "npx -y @agentmemory/agentmemory"
    env_file:
      - .env
    ports:
      - "3111:3111"
      - "3113:3113"
    volumes:
      - ./data:/root/.agentmemory
    restart: unless-stopped
```

### 4) 컨테이너 실행

```bash
cd /volume1/docker/agentmemory
docker compose up -d
```

Container Manager UI를 쓰는 경우:

1. 프로젝트 → 생성 → `docker-compose.yml` 불러오기
2. 환경파일 `.env` 지정
3. 배포 실행

### 5) 동작 확인

```bash
curl http://<NAS_IP>:3111/agentmemory/health
```

- Real-time Viewer: `http://<NAS_IP>:3113`
- 내부망만 쓸 경우 DSM 방화벽에서 3111/3113을 내부 대역만 허용

### 6) 에이전트(MCP) 연결 포인트

- 같은 PC에서 사용 시 MCP 서버 주소를 `http://<NAS_IP>:3111`로 지정
- 외부 접속이 필요하면 역방향 프록시 + HTTPS + 인증 토큰(`AGENTMEMORY_SECRET`) 적용

### 6-1) DSM 역방향 프록시(HTTPS) 설정

#### A. 인증서 준비

1. DSM → **제어판 → 보안 → 인증서**
2. `agentmemory`용 인증서 발급(Let's Encrypt) 또는 가져오기
3. 도메인 예시:
   - API: `agentmemory.example.com`
   - Viewer: `agentmemory-viewer.example.com`

#### B. 역방향 프록시 규칙 추가

DSM → **제어판 → 로그인 포털 → 고급 → 역방향 프록시**에서 규칙 생성

1. API 규칙(3111)

- 소스:
  - 프로토콜: `HTTPS`
  - 호스트이름: `agentmemory.example.com`
  - 포트: `443`

- 대상:
  - 프로토콜: `HTTP`
  - 호스트이름: `127.0.0.1`
  - 포트: `3111`

1. Viewer 규칙(3113)

- 소스:
  - 프로토콜: `HTTPS`
  - 호스트이름: `agentmemory-viewer.example.com`
  - 포트: `443`

- 대상:
  - 프로토콜: `HTTP`
  - 호스트이름: `127.0.0.1`
  - 포트: `3113`

#### C. 헤더/보안 권장

- 사용자 지정 헤더(없으면 추가):
  - `X-Forwarded-Proto: https`
  - `X-Forwarded-Host: <원본 호스트>`
- HSTS/HTTP→HTTPS 리다이렉트 활성화 권장
- 외부 공개 시 `AGENTMEMORY_SECRET` 필수

#### D. 연결 확인

```bash
curl https://agentmemory.example.com/agentmemory/health
```

- Viewer 접속: `https://agentmemory-viewer.example.com`
- MCP에서 엔드포인트를 `https://agentmemory.example.com` 기준으로 설정

### 7) 업데이트

```bash
cd /volume1/docker/agentmemory
docker compose down
docker compose pull
docker compose up -d
```

### 8) 트러블슈팅

- 컨테이너가 바로 종료되면 로그 확인: `docker logs agentmemory --tail 200`
- 포트 충돌 시 `3111`, `3113` 점유 서비스 확인 후 compose 포트 변경
- Viewer만 안 열리면 NAS 방화벽/공유기 포트포워딩 설정 확인

## 확인

1. `curl http://localhost:3111/agentmemory/health` → health 응답 확인
2. http://localhost:3113 → Real-time Viewer 접속 확인
3. 에이전트에서 `/recall <쿼리>` → 검색 결과 반환 확인
4. `AGENTMEMORY_TOOLS=all` 설정 시 51개 툴 확인

## 주의사항

- **AGENTMEMORY_AUTO_COMPRESS=false** (기본값): ON 시 모든 PostToolUse에서 LLM 호출 → 상당한 토큰 비용
- **AGENTMEMORY_ALLOW_AGENT_SDK**: Claude 구독 폴백. Stop-hook 재귀 위험(#149)으로 기본 비활성화
- **iii engine v0.11.2 고정**: v0.11.6+은 새 sandbox 모델 필요
- **127.0.0.1 바인딩**: 기본값, 외부 노출 시 AGENTMEMORY_SECRET 필수

## 출처

- [agentmemory GitHub](https://github.com/rohitg00/agentmemory)

## See also
- [agentmemory (엔티티)](/wiki/entities/agentmemory/) — 도구 정체
- [agentmemory 소스](/wiki/sources/agentmemory/) — 기능 상세
- [iii Engine](/wiki/concepts/iii-engine/) — 기반 런타임
- [Claude Code](/wiki/entities/claude-code/) — hooks + MCP 통합
- [MCP 프로토콜](/wiki/entities/mcp-protocol/) — MCP 서버 설정
- [파일시스템 기반 메모리](/wiki/concepts/filesystem-based-memory/) — 메모리 패턴
