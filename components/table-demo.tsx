'use client'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const WRAP = 'not-prose flex flex-col gap-4 rounded-xl border border-border bg-muted/30 px-6 py-5 my-4'

export function TableBasicDemo() {
  const members = [
    { name: '김지수', role: '디자이너', dept: '프로덕트', email: 'jisu@example.com' },
    { name: '이민준', role: '프론트엔드', dept: '엔지니어링', email: 'minjun@example.com' },
    { name: '박서연', role: '백엔드', dept: '엔지니어링', email: 'seoyeon@example.com' },
    { name: '최예린', role: '기획', dept: '프로덕트', email: 'yerin@example.com' },
  ]
  return (
    <div className={WRAP}>
      <Table>
        <TableCaption>현재 프로젝트 팀원 목록이에요.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>부서</TableHead>
            <TableHead>이메일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.email}>
              <TableCell className="font-medium">{m.name}</TableCell>
              <TableCell>{m.role}</TableCell>
              <TableCell>{m.dept}</TableCell>
              <TableCell className="text-muted-foreground">{m.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function TableStatusDemo() {
  const apis = [
    { name: '사용자 인증 API', calls: 1204, successRate: '99.8%', status: '정상' },
    { name: '데이터 조회 API', calls: 987, successRate: '99.1%', status: '정상' },
    { name: '파일 업로드 API', calls: 342, successRate: '91.2%', status: '점검 중' },
    { name: '알림 발송 API', calls: 758, successRate: '98.7%', status: '정상' },
    { name: '결제 처리 API', calls: 215, successRate: '85.4%', status: '오류' },
  ]
  return (
    <div className={WRAP}>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/60 hover:bg-muted/60">
            <TableHead className="border-r">API 이름</TableHead>
            <TableHead className="text-right border-r">호출 수</TableHead>
            <TableHead className="text-right border-r">성공률</TableHead>
            <TableHead className="text-center">상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apis.map((api) => (
            <TableRow key={api.name}>
              <TableCell className="font-medium border-r">{api.name}</TableCell>
              <TableCell className="text-right text-muted-foreground border-r">
                {api.calls.toLocaleString()}건
              </TableCell>
              <TableCell className="text-right border-r">{api.successRate}</TableCell>
              <TableCell className="text-center">
                <Badge
                  variant={
                    api.status === '정상'
                      ? 'default'
                      : api.status === '점검 중'
                        ? 'secondary'
                        : 'destructive'
                  }
                >
                  {api.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function TableFooterDemo() {
  const items = [
    { name: 'Claude Pro 구독', qty: 1, price: 20 },
    { name: '추가 사용량', qty: 3, price: 5 },
    { name: '팀 라이선스', qty: 2, price: 15 },
    { name: '지원 플랜', qty: 1, price: 10 },
  ]
  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0)
  return (
    <div className={WRAP}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>항목</TableHead>
            <TableHead className="text-right">수량</TableHead>
            <TableHead className="text-right">단가</TableHead>
            <TableHead className="text-right">금액</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="text-right">{item.qty}</TableCell>
              <TableCell className="text-right">${item.price}</TableCell>
              <TableCell className="text-right">${item.qty * item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-semibold">
              합계
            </TableCell>
            <TableCell className="text-right font-semibold">${total}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
