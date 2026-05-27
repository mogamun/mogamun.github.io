# Project: Contents Directory (Gatsby Blog)

## Dev Server
- Gatsby dev server는 항상 **port 8000**으로 구동할 것 (`--port 8000`)
- **port 9235는 절대 종료(kill)하지 않는다** — 다른 용도로 사용 중인 포트이므로 건드리지 않는다.
- 기존 dev server 재시작이 필요할 때는 8000 포트만 종료 후 재구동한다.

## 배당 캘린더 데이터 갱신
- **스크립트 위치**: `~/projects/multiagent/scripts/fetch_dividends.py` (비공개 레포)
- **출력**: `static/kit/dividend-data.json` (이 프로젝트)
- **실행**: `cd ~/projects/multiagent && python3 scripts/fetch_dividends.py`
- 네이버 증권에서 코스피/코스닥 상위 종목 배당 데이터를 수집 (약 3분 소요)
- 데이터가 오래된 경우 배당 캘린더 페이지에 안내 메시지 표시됨
- **주기**: 분기 1회 또는 연말 배당 시즌 전에 실행 권장

