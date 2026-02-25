import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    q: "입력한 정보는 저장되나요?",
    a: "이번 단계에서는 저장하지 않습니다. 결과 표시용으로만 사용됩니다.",
  },
  {
    q: "출생시간을 모르면 이용이 어렵나요?",
    a: "아니요. 출생시간은 선택 입력이며, 모르셔도 오늘의운세·신년운세·궁합 등 많은 서비스를 이용할 수 있습니다.",
  },
  {
    q: "음력 생일도 입력할 수 있나요?",
    a: "네. 생년월일 입력 시 음력/양력 토글로 선택하실 수 있습니다.",
  },
  {
    q: "결과는 참고용인가요?",
    a: "네. 본 서비스는 오락 및 참고 목적으로만 제공됩니다. 중요한 결정은 전문가와 상담하시기 바랍니다.",
  },
  {
    q: "무료로 이용할 수 있나요?",
    a: "현재 단계에서는 무료로 이용 가능합니다.",
  },
];

export function FAQSection() {
  return (
    <section className="py-14" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-2xl font-bold mb-8 text-center text-foreground"
      >
        자주 묻는 질문
      </h2>
      <div className="mx-auto max-w-2xl">
        <Accordion
          type="single"
          collapsible
          className="space-y-2 rounded-xl border-2 border-border bg-card p-2 shadow-sm"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-lg border border-border/60 px-4 data-[state=open]:bg-muted/50"
            >
              <AccordionTrigger className="py-4 text-left font-medium hover:no-underline hover:text-violet-600">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
