import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StepIndicatorProps {
  steps: { label: string; description?: string }[];
  currentStep: number;
  className?: string;
  variant?: "horizontal" | "vertical";
}

export function StepIndicator({ steps, currentStep, className, variant = "horizontal" }: StepIndicatorProps) {
  const isVertical = variant === "vertical";

  return (
    <div className={cn("w-full", isVertical ? "flex flex-col space-y-0" : "flex items-center", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isUpcoming = index > currentStep;

        return (
          <div
            key={index}
            className={cn(
              "flex items-center",
              isVertical ? "flex-row" : "flex-1",
              index !== steps.length - 1 && !isVertical && "flex-1"
            )}
          >
            <div className={cn("flex items-center", isVertical && "flex-row")}>
              {/* Step Circle */}
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? "hsl(var(--accent))"
                    : isCurrent
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted))",
                }}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  isCompleted && "text-accent-foreground",
                  isCurrent && "text-primary-foreground ring-4 ring-primary/20",
                  isUpcoming && "text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </motion.div>

              {/* Step Label */}
              <div className={cn("ml-3", !isVertical && "hidden md:block")}>
                <p
                  className={cn(
                    "text-sm font-medium",
                    isCompleted && "text-accent",
                    isCurrent && "text-primary",
                    isUpcoming && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  isVertical
                    ? "ml-5 h-8 w-0.5"
                    : "mx-4 h-0.5 flex-1",
                  "bg-border transition-colors",
                  isCompleted && "bg-accent"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, className, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover",
        className
      )}
    >
      <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
    </motion.div>
  );
}

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}

export function StatCard({ value, label, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl bg-card p-6 shadow-card", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {Icon && (
          <div className="rounded-xl bg-accent/10 p-3 text-accent">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}

interface ScoreDisplayProps {
  score: number;
  maxScore?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
  className?: string;
}

export function ScoreDisplay({
  score,
  maxScore = 100,
  label,
  size = "md",
  showPercentage = true,
  className,
}: ScoreDisplayProps) {
  const percentage = Math.round((score / maxScore) * 100);
  const getScoreColor = () => {
    if (percentage < 25) return "text-destructive";
    if (percentage < 50) return "text-warning";
    if (percentage < 75) return "text-success";
    return "text-accent";
  };

  const sizeClasses = {
    sm: "h-24 w-24",
    md: "h-36 w-36",
    lg: "h-48 w-48",
  };

  const textSizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Background Circle */}
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={getScoreColor()}
            initial={{ strokeDasharray: "0 283" }}
            animate={{ strokeDasharray: `${(percentage / 100) * 283} 283` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={cn("font-display font-bold", textSizeClasses[size], getScoreColor())}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          {showPercentage && (
            <span className="text-xs text-muted-foreground">/{maxScore}</span>
          )}
        </div>
      </div>
      {label && <p className="mt-3 text-sm font-medium text-muted-foreground">{label}</p>}
    </div>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  className?: string;
}

export function TestimonialCard({ quote, author, role, avatar, className }: TestimonialCardProps) {
  return (
    <div className={cn("rounded-2xl bg-card p-6 shadow-card", className)}>
      <blockquote className="mb-4 text-foreground">
        <span className="text-3xl text-accent">"</span>
        <p className="inline text-sm leading-relaxed">{quote}</p>
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
          {avatar ? (
            <img src={avatar} alt={author} className="h-full w-full rounded-full object-cover" />
          ) : (
            <span className="font-semibold">{author[0]}</span>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{author}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}
