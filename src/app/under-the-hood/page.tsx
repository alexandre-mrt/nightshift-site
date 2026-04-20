"use client";

import {
  DepthProvider,
  DepthSwitch,
  Intuitive,
  Technical,
  Both,
} from "@/components/DepthToggle";
import MermaidDiagram from "@/components/MermaidDiagram";
import Collapsible from "@/components/Collapsible";
import { FlashcardDeck, KeyTakeaway } from "@/components/LearningCard";

/* ------------------------------------------------------------------ */
/*  Reusable primitives                                                */
/* ------------------------------------------------------------------ */

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mb-4 mt-16 scroll-mt-24 text-2xl font-bold tracking-tight text-white"
    >
      {children}
    </h2>
  );
}

function SubHeading({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      id={id}
      className="mb-3 mt-8 scroll-mt-24 text-lg font-semibold text-zinc-200"
    >
      {children}
    </h3>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-zinc-400">
      {children}
    </div>
  );
}

function MathBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-3 font-mono text-xs leading-relaxed sm:px-4 sm:text-sm">
      {children}
    </div>
  );
}

function CodeBlock({
  children,
  title,
}: {
  children: string;
  title?: string;
}) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-zinc-800">
      {title && (
        <div className="border-b border-zinc-800 bg-zinc-900 px-4 py-2 font-mono text-xs text-zinc-500">
          {title}
        </div>
      )}
      <pre className="overflow-x-auto bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-300">
        {children}
      </pre>
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-4 rounded-lg border border-zinc-700 bg-zinc-900/60 p-4">
      <p className="mb-2 text-sm font-semibold text-zinc-200">{title}</p>
      <div className="text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}

function TocLink({ href, children }: { href: string; children: string }) {
  return (
    <li>
      <a
        href={href}
        className="text-sm text-zinc-400 transition-colors hover:text-emerald-400"
      >
        {children}
      </a>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function UnderTheHoodPage() {
  return (
    <DepthProvider>
      <div className="mx-auto max-w-4xl px-3 py-10 sm:px-6 sm:py-16">
        {/* ============================================================ */}
        {/*  1. HERO / INTRO                                             */}
        {/* ============================================================ */}
        <header className="mb-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-emerald-400">
            Deep Dive
          </p>
          <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Under the Hood
          </h1>
          <p className="max-w-2xl text-lg text-zinc-400">
            How LLMs, Claude Code, and MCP actually work &mdash; from intuition
            to math.
          </p>
        </header>

        <DepthSwitch />

        {/* ---- Table of Contents ---- */}
        <nav className="mb-12 rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Contents
          </p>
          <ol className="list-inside list-decimal space-y-1.5">
            <TocLink href="#transformer">Transformer Architecture</TocLink>
            <TocLink href="#training">Training Pipeline</TocLink>
            <TocLink href="#inference">Inference &amp; Generation</TocLink>
            <TocLink href="#powerful">What Makes LLMs Powerful</TocLink>
            <TocLink href="#claude-code">Claude Code &mdash; The Agentic Loop</TocLink>
            <TocLink href="#mcp">MCP (Model Context Protocol)</TocLink>
            <TocLink href="#why-stack">Why This Stack is Powerful</TocLink>
          </ol>
        </nav>

        {/* ============================================================ */}
        {/*  2. TRANSFORMER ARCHITECTURE                                 */}
        {/* ============================================================ */}
        <SectionHeading id="transformer">
          1. Transformer Architecture
        </SectionHeading>

        {/* --- Intuitive mode --- */}
        <Intuitive>
          <Prose>
            <p>
              Imagine a room full of translators, each one listening to{" "}
              <span className="text-zinc-200">every word</span> in a sentence
              simultaneously to understand context. That is the core idea behind
              the <span className="text-emerald-400">Transformer</span> &mdash;
              the architecture powering every modern LLM (GPT, Claude, LLaMA,
              Gemini).
            </p>
            <p>
              Older models read sentences word-by-word, like reading a book one
              letter at a time. Transformers look at the entire sentence at once
              and ask:{" "}
              <em className="text-zinc-300">
                &ldquo;Which words are most relevant to understanding each other
                word?&rdquo;
              </em>
            </p>
          </Prose>

          <SubHeading>Attention as &ldquo;Relevance Scoring&rdquo;</SubHeading>
          <Prose>
            <p>
              The mechanism that makes this work is called{" "}
              <span className="text-emerald-400">self-attention</span>. For
              every word in a sentence, the model scores how relevant every
              other word is:
            </p>
          </Prose>
          <InfoCard title="Example: resolving &ldquo;it&rdquo;">
            <p>
              In &ldquo;The cat sat on the mat because{" "}
              <span className="text-orange-400">it</span> was tired&rdquo;, the
              word &ldquo;it&rdquo; needs to attend strongly to &ldquo;cat&rdquo;
              to understand the sentence. Self-attention assigns a high score
              between &ldquo;it&rdquo; and &ldquo;cat&rdquo;, and low scores to
              irrelevant words like &ldquo;on&rdquo; or &ldquo;the&rdquo;.
            </p>
          </InfoCard>

          <SubHeading>The Pipeline: Token to Prediction</SubHeading>
          <Prose>
            <p>
              Every time the model processes text, it flows through four stages:
            </p>
          </Prose>
          <div className="my-6 flex flex-col items-center gap-2 sm:flex-row sm:gap-0">
            {[
              { label: "Tokenize", desc: "Split text into chunks" },
              { label: "Embed", desc: "Map to numbers" },
              { label: "Attend", desc: "Score relevance" },
              { label: "Predict", desc: "Pick next word" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-center">
                  <p className="text-xs font-bold text-emerald-400">
                    {step.label}
                  </p>
                  <p className="text-[11px] text-zinc-500">{step.desc}</p>
                </div>
                {i < 3 && (
                  <span className="hidden text-zinc-600 sm:inline">
                    &rarr;
                  </span>
                )}
              </div>
            ))}
          </div>
          <Prose>
            <p>
              The text is first broken into <strong>tokens</strong> (common words
              become one token; rare words are split into sub-words). These
              tokens are converted into lists of numbers (
              <strong>embeddings</strong>) that capture meaning. The attention
              mechanism scores relevance between all tokens, and the result is
              used to predict the most likely next token.
            </p>
          </Prose>
        </Intuitive>

        {/* --- Technical mode --- */}
        <Technical>
          <SubHeading id="tokenization">Tokenization (BPE)</SubHeading>
          <Prose>
            <p>
              Raw text is converted to integer tokens via{" "}
              <span className="text-orange-400">Byte Pair Encoding</span>. The
              algorithm starts with single characters, counts adjacent pairs,
              and iteratively merges the most frequent pair until the vocabulary
              reaches a target size (~100k tokens). Each token index maps to a
              dense vector via a learned embedding matrix{" "}
              <span className="font-mono text-zinc-300">
                W<sub>e</sub>
              </span>{" "}
              of shape{" "}
              <span className="font-mono text-zinc-300">
                |V| &times; d<sub>model</sub>
              </span>
              .
            </p>
          </Prose>

          <SubHeading id="self-attention">Self-Attention</SubHeading>
          <Prose>
            <p>
              Given input embeddings{" "}
              <span className="font-mono text-zinc-300">
                X &isin; &#x211D;<sup>n&times;d</sup>
              </span>
              , we compute three projections using learned weight matrices:
            </p>
          </Prose>
          <MathBlock>
            <span className="text-orange-400">Q</span> = X
            <span className="text-blue-400">
              W<sup>Q</sup>
            </span>
            ,&ensp;
            <span className="text-orange-400">K</span> = X
            <span className="text-blue-400">
              W<sup>K</sup>
            </span>
            ,&ensp;
            <span className="text-orange-400">V</span> = X
            <span className="text-blue-400">
              W<sup>V</sup>
            </span>
          </MathBlock>
          <Prose>
            <p>
              <strong>Q</strong> (Query) = &ldquo;What am I looking for?&rdquo;
              &ensp;|&ensp; <strong>K</strong> (Key) = &ldquo;What do I
              contain?&rdquo; &ensp;|&ensp; <strong>V</strong> (Value) =
              &ldquo;My actual content.&rdquo;
            </p>
          </Prose>

          <SubHeading id="attention-formula">
            Scaled Dot-Product Attention
          </SubHeading>
          <MathBlock>
            <span className="text-orange-400">Attention</span>(Q, K, V) ={" "}
            <span className="text-blue-400">softmax</span>(QK
            <sup>T</sup> /{" "}
            <span className="text-emerald-400">
              &radic;d<sub>k</sub>
            </span>
            )V
          </MathBlock>
          <Prose>
            <p>Step-by-step:</p>
            <ol className="list-inside list-decimal space-y-1">
              <li>
                <strong>Compute scores:</strong>{" "}
                <span className="font-mono text-zinc-300">
                  S = QK<sup>T</sup>
                </span>{" "}
                &mdash; entry S<sub>ij</sub> measures how much token i should
                attend to token j.
              </li>
              <li>
                <strong>Scale:</strong> Divide by{" "}
                <span className="font-mono text-emerald-400">
                  &radic;d<sub>k</sub>
                </span>{" "}
                to keep gradients healthy (prevents softmax saturation when d
                <sub>k</sub> is large).
              </li>
              <li>
                <strong>Causal mask:</strong> Set S<sub>ij</sub> = &minus;&infin;
                for j &gt; i (decoder models can only attend to past/present
                tokens).
              </li>
              <li>
                <strong>Softmax:</strong> Each row sums to 1, giving attention
                weights A<sub>ij</sub>.
              </li>
              <li>
                <strong>Weighted sum:</strong> Output = AV &mdash; each token is
                a weighted mix of all value vectors.
              </li>
            </ol>
            <p>
              Computational complexity:{" "}
              <span className="font-mono text-zinc-300">
                O(n<sup>2</sup> &middot; d<sub>k</sub>)
              </span>{" "}
              &mdash; the fundamental bottleneck for long sequences. A 128K
              context window has ~16.4 billion attention entries.
            </p>
          </Prose>

          <SubHeading id="multi-head">Multi-Head Attention</SubHeading>
          <Prose>
            <p>
              A single head captures one type of relationship. Multi-head
              attention runs{" "}
              <span className="font-mono text-zinc-300">h</span> parallel
              attention heads, each learning different patterns:
            </p>
          </Prose>
          <MathBlock>
            <span className="text-orange-400">MultiHead</span>(Q, K, V) ={" "}
            <span className="text-blue-400">Concat</span>(head<sub>1</sub>,
            &hellip;, head<sub>h</sub>)
            <span className="text-emerald-400">
              W<sup>O</sup>
            </span>
          </MathBlock>
          <MathBlock>
            head<sub>i</sub> ={" "}
            <span className="text-orange-400">Attention</span>(XW
            <sub>i</sub>
            <sup>Q</sup>, XW<sub>i</sub>
            <sup>K</sup>, XW<sub>i</sub>
            <sup>V</sup>)
          </MathBlock>
          <Prose>
            <p>
              With{" "}
              <span className="font-mono text-zinc-300">
                d<sub>model</sub> = 4096
              </span>{" "}
              and{" "}
              <span className="font-mono text-zinc-300">h = 32</span> heads,
              each head operates on a 128-dimensional subspace. Modern variants
              include <strong>Grouped Query Attention</strong> (GQA), which
              shares K/V across groups of heads, reducing KV cache by 4&ndash;8x.
            </p>
          </Prose>

          <SubHeading id="positional">Positional Encoding</SubHeading>
          <Prose>
            <p>
              Self-attention is permutation-invariant. Without positional
              information, &ldquo;the dog bit the man&rdquo; and &ldquo;the man
              bit the dog&rdquo; produce identical representations.
            </p>
          </Prose>

          <Collapsible title="Sinusoidal Positional Encoding (Original Transformer)">
            <MathBlock>
              PE<sub>(pos, 2i)</sub> ={" "}
              <span className="text-blue-400">sin</span>(pos / 10000
              <sup>
                2i/d<sub>model</sub>
              </sup>
              )
            </MathBlock>
            <MathBlock>
              PE<sub>(pos, 2i+1)</sub> ={" "}
              <span className="text-blue-400">cos</span>(pos / 10000
              <sup>
                2i/d<sub>model</sub>
              </sup>
              )
            </MathBlock>
            <Prose>
              <p>
                Each dimension oscillates at a different frequency, forming a
                geometric progression of wavelengths. Deterministic &mdash; no
                learned parameters.
              </p>
            </Prose>
          </Collapsible>

          <Collapsible title="RoPE (Rotary Position Embedding) &mdash; Modern LLMs">
            <Prose>
              <p>
                Used by LLaMA, Mistral, Qwen, and most modern architectures.
                Encodes position by <strong>rotating</strong> Q/K vectors in 2D
                subspaces.
              </p>
            </Prose>
            <MathBlock>
              <span className="text-orange-400">
                R<sub>&theta;,m</sub>
              </span>{" "}
              = [ cos(m&theta;<sub>i</sub>) &minus;sin(m&theta;<sub>i</sub>) ;
              sin(m&theta;<sub>i</sub>) cos(m&theta;<sub>i</sub>) ]
            </MathBlock>
            <MathBlock>
              &theta;<sub>i</sub> = 10000
              <sup>
                &minus;2i/d<sub>k</sub>
              </sup>
            </MathBlock>
            <Prose>
              <p>
                Key property: the dot product{" "}
                <span className="font-mono text-zinc-300">
                  q&#x0303;<sub>m</sub>
                  <sup>T</sup> k&#x0303;<sub>n</sub>
                </span>{" "}
                depends only on the <strong>relative position</strong> (m
                &minus; n) and the semantic content. Parameter-free, naturally
                relative, gracefully extends to long contexts.
              </p>
            </Prose>
          </Collapsible>

          <SubHeading id="ffn">Feed-Forward Network with SwiGLU</SubHeading>
          <MathBlock>
            <span className="text-orange-400">FFN</span>(x) = W<sub>2</sub>{" "}
            &middot; &sigma;(W<sub>1</sub>x + b<sub>1</sub>) + b<sub>2</sub>
          </MathBlock>
          <Prose>
            <p>
              Modern LLMs use{" "}
              <span className="text-orange-400">SwiGLU</span>:
            </p>
          </Prose>
          <MathBlock>
            <span className="text-orange-400">SwiGLU</span>(x) ={" "}
            <span className="text-blue-400">Swish</span>(xW<sub>1</sub>){" "}
            &odot; (xW<sub>3</sub>)
          </MathBlock>
          <Prose>
            <p>
              where{" "}
              <span className="font-mono text-zinc-300">
                Swish(x) = x &middot; &sigma;(x)
              </span>{" "}
              and &odot; is element-wise multiplication. The FFN acts as a
              per-token &ldquo;processor&rdquo; &mdash; research suggests
              factual knowledge is primarily stored in FFN weights.
            </p>
          </Prose>

          <SubHeading id="full-pass">Full Forward Pass</SubHeading>
          <Prose>
            <p>A single transformer decoder layer computes:</p>
          </Prose>
          <MathBlock>
            h&prime;<sub>l</sub> = h<sub>l&minus;1</sub> +{" "}
            <span className="text-orange-400">MultiHeadAttention</span>(
            <span className="text-blue-400">LayerNorm</span>(h<sub>l&minus;1</sub>
            ))
          </MathBlock>
          <MathBlock>
            h<sub>l</sub> = h&prime;<sub>l</sub> +{" "}
            <span className="text-orange-400">FFN</span>(
            <span className="text-blue-400">LayerNorm</span>(h&prime;
            <sub>l</sub>))
          </MathBlock>
          <Prose>
            <p>
              The full forward pass stacks L layers, applies a final LayerNorm,
              then projects to vocabulary logits via weight tying with the
              embedding matrix:
            </p>
          </Prose>
          <MathBlock>
            <span className="text-blue-400">logits</span> = h &middot; W
            <sub>e</sub>
            <sup>T</sup> &isin; &#x211D;
            <sup>n &times; |V|</sup>
          </MathBlock>
          <MathBlock>
            P(<span className="text-emerald-400">next token</span>) ={" "}
            <span className="text-blue-400">softmax</span>(logits / T)
          </MathBlock>

          <MermaidDiagram
            chart={`graph TD
    A["Input Token Embeddings"] --> B["+ Positional Encoding (RoPE)"]
    B --> C["Layer Norm"]
    C --> D["Multi-Head Self-Attention"]
    D --> E["+ Residual Connection"]
    B --> E
    E --> F["Layer Norm"]
    F --> G["Feed-Forward Network (SwiGLU)"]
    G --> H["+ Residual Connection"]
    E --> H
    H --> I{"Repeat x L layers"}
    I --> J["Final Layer Norm"]
    J --> K["Linear Projection to Vocab"]
    K --> L["Softmax / Temperature"]
    L --> M["Next Token Probability"]`}
            className="my-6"
          />

          <Collapsible title="Layer Normalization &amp; Residual Connections">
            <Prose>
              <p>
                <strong>Residual connections</strong> provide a direct gradient
                highway through deep networks:
              </p>
            </Prose>
            <MathBlock>
              Output = x + SubLayer(x)&emsp;&rArr;&emsp;&part;Output/&part;x = I
              + &part;SubLayer(x)/&part;x
            </MathBlock>
            <Prose>
              <p>
                The identity term I ensures gradients never fully vanish. Modern
                LLMs use <strong>Pre-Norm</strong> (applying LayerNorm before
                the sublayer) and often <strong>RMSNorm</strong> for efficiency:
              </p>
            </Prose>
            <MathBlock>
              <span className="text-orange-400">RMSNorm</span>(x) = &gamma;
              &middot; x / &radic;(
              <span className="text-blue-400">mean</span>(x<sub>i</sub>
              <sup>2</sup>) + &epsilon;)
            </MathBlock>
          </Collapsible>
        </Technical>

        <FlashcardDeck
          title="Test Your Understanding: Transformers"
          cards={[
            {
              question: "Why is self-attention called 'self' attention?",
              answer: "Because the model attends to different positions within the SAME sequence — it scores relevance between every pair of tokens in its own input, rather than attending to a separate sequence.",
              hint: "Think about what it's attending TO",
            },
            {
              question: "Why divide by √d_k in the attention formula?",
              answer: "Without scaling, dot products grow large with high dimensions, pushing softmax into regions with tiny gradients (near 0 or 1). Dividing by √d_k keeps values in a range where softmax produces useful gradients for training.",
              hint: "Think about what happens to softmax with very large inputs",
            },
            {
              question: "What's the difference between multi-head attention and single-head?",
              answer: "Multi-head attention runs several attention operations in parallel, each with different learned projections. Each head can learn different relationship types (syntactic, semantic, positional). Results are concatenated and projected.",
              hint: "Think of it as multiple perspectives on the same data",
            },
            {
              question: "Why do Transformers need positional encoding?",
              answer: "Self-attention is permutation-invariant — it has no inherent notion of token order. Positional encoding injects sequence position information so the model knows that 'dog bites man' differs from 'man bites dog'.",
              hint: "What would happen if you shuffled all words?",
            },
          ]}
        />

        <KeyTakeaway title="Key Insight" icon="lightbulb">
          The Transformer&apos;s power comes from <strong>parallel attention</strong> — unlike RNNs that process sequentially, Transformers see the entire context at once. This enables massive parallelism on GPUs and captures long-range dependencies that sequential models miss.
        </KeyTakeaway>

        {/* ============================================================ */}
        {/*  3. TRAINING PIPELINE                                        */}
        {/* ============================================================ */}
        <SectionHeading id="training">2. Training Pipeline</SectionHeading>

        {/* --- Intuitive mode --- */}
        <Intuitive>
          <Prose>
            <p>
              Training a modern LLM is a three-stage journey, each building on
              the last:
            </p>
          </Prose>
          <div className="my-6 space-y-4">
            {[
              {
                num: "1",
                title: "Learning from the Internet",
                desc: 'The model reads trillions of words of text \u2014 books, articles, code, conversations \u2014 and learns to predict the next word. This is like learning a language by reading everything ever written. The model learns grammar, facts, reasoning patterns, and even some common sense.',
                color: "text-blue-400",
              },
              {
                num: "2",
                title: "Learning from Human Feedback",
                desc: 'Human trainers rate the model\u2019s responses: "This answer was helpful" vs. "This one was harmful." The model learns to produce responses humans prefer. Think of it as a student getting feedback from teachers.',
                color: "text-emerald-400",
              },
              {
                num: "3",
                title: 'Learning "Self-Control"',
                desc: "Anthropic\u2019s Constitutional AI goes further: the model critiques its own responses against a set of principles (the \u201Cconstitution\u201D) and learns to self-correct. It\u2019s like learning not just from teachers, but from an internal moral compass.",
                color: "text-orange-400",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
              >
                <span
                  className={`text-2xl font-black ${step.color}`}
                >
                  {step.num}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-200">
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Prose>
            <p>
              The result? A model that is fluent, helpful, and safe &mdash; all
              without explicitly programming any rules.
            </p>
          </Prose>
        </Intuitive>

        {/* --- Technical mode --- */}
        <Technical>
          <SubHeading id="pretraining">
            Pre-training: Cross-Entropy Loss
          </SubHeading>
          <Prose>
            <p>
              The objective is causal language modeling &mdash; predict the next
              token given all previous tokens:
            </p>
          </Prose>
          <MathBlock>
            <span className="text-orange-400">L</span>(&theta;) = &minus;(1/n)
            &sum;<sub>t=1..n</sub>{" "}
            <span className="text-blue-400">log</span> P<sub>&theta;</sub>(x
            <sub>t</sub> | x<sub>1</sub>, &hellip;, x<sub>t&minus;1</sub>)
          </MathBlock>
          <Prose>
            <p>
              Minimizing cross-entropy is equivalent to maximizing likelihood of
              the training data and minimizing KL divergence between the true
              data distribution and the model:
            </p>
          </Prose>
          <MathBlock>
            L = H(P<sub>data</sub>, P<sub>&theta;</sub>) = H(P<sub>data</sub>)
            + D<sub>KL</sub>(P<sub>data</sub> &Vert; P<sub>&theta;</sub>)
          </MathBlock>
          <Prose>
            <p>
              <strong>Scale:</strong> Trillions of tokens, thousands of GPUs,
              weeks to months, millions of dollars.
            </p>
          </Prose>

          <SubHeading id="rlhf">RLHF (Reinforcement Learning from Human Feedback)</SubHeading>

          <Collapsible title="Stage 1: Supervised Fine-Tuning (SFT)">
            <Prose>
              <p>
                Fine-tune on high-quality (prompt, response) pairs using the same
                cross-entropy loss. Curated data only.
              </p>
            </Prose>
          </Collapsible>

          <Collapsible title="Stage 2: Reward Model Training">
            <Prose>
              <p>
                Human annotators rank response pairs. A reward model r<sub>&phi;</sub>(x, y) is trained using the Bradley-Terry preference model:
              </p>
            </Prose>
            <MathBlock>
              P(y<sub>1</sub> &succ; y<sub>2</sub> | x) ={" "}
              <span className="text-blue-400">&sigma;</span>(r<sub>&phi;</sub>
              (x, y<sub>1</sub>) &minus; r<sub>&phi;</sub>(x, y<sub>2</sub>))
            </MathBlock>
            <MathBlock>
              <span className="text-orange-400">L</span>
              <sub>RM</sub> = &minus;E<sub>(x, y<sub>w</sub>, y<sub>l</sub>)</sub>[{" "}
              <span className="text-blue-400">log</span> &sigma;(r<sub>&phi;</sub>
              (x, y<sub>w</sub>) &minus; r<sub>&phi;</sub>(x, y<sub>l</sub>)) ]
            </MathBlock>
          </Collapsible>

          <Collapsible title="Stage 3: PPO Optimization">
            <Prose>
              <p>Balance reward maximization with staying close to the original model:</p>
            </Prose>
            <MathBlock>
              <span className="text-orange-400">max</span>
              <sub>&pi;<sub>&theta;</sub></sub>{" "}
              E<sub>x~D, y~&pi;<sub>&theta;</sub></sub>[ r<sub>&phi;</sub>(x, y)
              &minus; <span className="text-emerald-400">&beta;</span> &middot; D
              <sub>KL</sub>(&pi;<sub>&theta;</sub> &Vert; &pi;
              <sub>ref</sub>) ]
            </MathBlock>
            <Prose>
              <p>PPO constrains updates with a clipped surrogate objective:</p>
            </Prose>
            <MathBlock>
              L<sup>CLIP</sup>(&theta;) = E<sub>t</sub>[{" "}
              <span className="text-blue-400">min</span>( r<sub>t</sub>(&theta;)
              A&#x0302;<sub>t</sub>,{" "}
              <span className="text-orange-400">clip</span>(r<sub>t</sub>
              (&theta;), 1&minus;&epsilon;, 1+&epsilon;) A&#x0302;<sub>t</sub> )
              ]
            </MathBlock>
            <Prose>
              <p>
                The KL penalty prevents reward hacking &mdash; without it, the
                model would produce outputs that score high on the reward model
                but are incoherent.
              </p>
            </Prose>
          </Collapsible>

          <SubHeading id="cai">Constitutional AI (Anthropic)</SubHeading>
          <Prose>
            <p>
              CAI replaces human preference labeling with{" "}
              <strong>AI-generated feedback</strong> guided by explicit
              principles:
            </p>
            <ol className="list-inside list-decimal space-y-1">
              <li>
                <strong>SL-CAI:</strong> Model generates a response, critiques
                it against the constitution, revises it, then is fine-tuned on
                the revision.
              </li>
              <li>
                <strong>RLAIF:</strong> The AI itself judges response pairs (not
                humans), trains a reward model, then applies RL fine-tuning.
              </li>
            </ol>
          </Prose>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-700 text-zinc-400">
                  <th className="py-2 pr-4">Aspect</th>
                  <th className="py-2 pr-4">Standard RLHF</th>
                  <th className="py-2">Constitutional AI</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4 text-zinc-500">Feedback source</td>
                  <td className="py-2 pr-4">Human annotators</td>
                  <td className="py-2">AI model itself</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4 text-zinc-500">Scalability</td>
                  <td className="py-2 pr-4">Limited by budget</td>
                  <td className="py-2">Highly scalable</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4 text-zinc-500">Transparency</td>
                  <td className="py-2 pr-4">Opaque preferences</td>
                  <td className="py-2">Auditable principles</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SubHeading id="scaling-laws">Scaling Laws</SubHeading>
          <Prose>
            <p>
              The <strong>Chinchilla</strong> finding (DeepMind, 2022): for
              compute-optimal training, scale model size N and training tokens D
              equally.
            </p>
          </Prose>
          <MathBlock>
            D<sub>opt</sub> &asymp; 20 &middot; N
          </MathBlock>
          <Prose>
            <p>
              A 70B model should train on ~1.4T tokens. GPT-3 (175B params, 300B
              tokens = 1.7 tokens/param) was severely under-trained. Chinchilla
              (70B params, 1.4T tokens = 20 tokens/param) outperformed Gopher
              (280B) despite being 4x smaller. Modern trend: train well past the
              optimal point for better inference efficiency (LLaMA 3 8B: 15T
              tokens = 1875 tokens/param).
            </p>
          </Prose>
        </Technical>

        <FlashcardDeck
          title="Test Your Understanding: Training"
          cards={[
            {
              question: "What is the training objective for pre-training?",
              answer: "Next-token prediction (causal language modeling). Given all previous tokens, predict the next one. The loss function is cross-entropy between the predicted probability distribution and the actual next token.",
              hint: "It's a prediction task on sequences",
            },
            {
              question: "How does RLHF differ from standard fine-tuning?",
              answer: "Standard fine-tuning trains on correct outputs directly. RLHF first trains a reward model on human preferences (which response is better), then uses PPO to optimize the LLM to maximize that reward while staying close to the original model (KL penalty).",
              hint: "It involves a reward model and a policy optimizer",
            },
            {
              question: "What is Constitutional AI's key innovation?",
              answer: "It replaces most human feedback with AI feedback. The model critiques and revises its own outputs based on a set of principles (the 'constitution'), then trains on its self-improved responses. This makes alignment more scalable and transparent.",
              hint: "Think about who provides the feedback",
            },
            {
              question: "What does the Chinchilla scaling law tell us?",
              answer: "For compute-optimal training, the ratio of training tokens to model parameters should be roughly 20:1. Many early LLMs were 'undertrained' — they had more parameters than their training data warranted. Chinchilla proved smaller models trained on more data outperform larger undertrained ones.",
              hint: "It's about the ratio of data to parameters",
            },
          ]}
        />

        {/* ============================================================ */}
        {/*  4. INFERENCE & GENERATION                                   */}
        {/* ============================================================ */}
        <SectionHeading id="inference">
          3. Inference &amp; Generation
        </SectionHeading>

        {/* --- Intuitive mode --- */}
        <Intuitive>
          <SubHeading>Predicting the Next Word</SubHeading>
          <Prose>
            <p>
              An LLM generates text one word at a time by looking at everything
              it has written so far and asking:{" "}
              <em className="text-zinc-300">
                &ldquo;What&rsquo;s the most likely next word?&rdquo;
              </em>
            </p>
            <p>
              But it does not just pick the single best word. It produces a{" "}
              <strong>probability distribution</strong> over its entire
              vocabulary (~100,000 tokens). Think of it as ranking every possible
              next word by likelihood:
            </p>
          </Prose>
          <div className="my-4 rounded-lg border border-zinc-700 bg-zinc-900 p-4">
            <p className="mb-3 text-xs font-semibold text-zinc-500">
              &ldquo;The cat sat on the ___&rdquo;
            </p>
            {[
              { word: "mat", pct: 35 },
              { word: "floor", pct: 25 },
              { word: "couch", pct: 15 },
              { word: "roof", pct: 8 },
              { word: "table", pct: 5 },
              { word: "...", pct: 12 },
            ].map((item) => (
              <div key={item.word} className="mb-1 flex items-center gap-2">
                <span className="w-12 text-right text-xs text-zinc-400">
                  {item.word}
                </span>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-emerald-500/60"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs text-zinc-500">
                  {item.pct}%
                </span>
              </div>
            ))}
          </div>

          <SubHeading>Temperature: The Creativity Dial</SubHeading>
          <Prose>
            <p>
              <strong>Temperature</strong> controls how &ldquo;creative&rdquo;
              the model is. Think of it as a dial:
            </p>
          </Prose>
          <div className="my-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                t: "T = 0",
                label: "Predictable",
                desc: "Always picks the top word. Good for code and facts.",
                color: "border-blue-500/40 bg-blue-500/5",
              },
              {
                t: "T = 1",
                label: "Balanced",
                desc: "Standard probabilities. Natural-sounding text.",
                color: "border-zinc-700 bg-zinc-900/50",
              },
              {
                t: "T > 1",
                label: "Creative",
                desc: "Flatter distribution. More surprising, riskier choices.",
                color: "border-orange-500/40 bg-orange-500/5",
              },
            ].map((item) => (
              <div
                key={item.t}
                className={`rounded-lg border p-3 ${item.color}`}
              >
                <p className="text-xs font-bold text-zinc-300">{item.t}</p>
                <p className="text-xs font-medium text-zinc-200">
                  {item.label}
                </p>
                <p className="mt-1 text-[11px] text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <SubHeading>Sampling: Rolling Weighted Dice</SubHeading>
          <Prose>
            <p>
              Instead of always picking the highest-probability word (greedy),
              the model <strong>samples</strong> &mdash; it rolls a weighted
              die, where more likely words have bigger slices. This creates
              natural-sounding, diverse text. Two key techniques:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <strong>Top-k:</strong> Only consider the k most likely words.
                (Like removing the long-shot options before rolling.)
              </li>
              <li>
                <strong>Top-p (nucleus):</strong> Include just enough words to
                cover p% of the probability. (Adapts automatically &mdash; when
                the model is confident, fewer words qualify.)
              </li>
            </ul>
          </Prose>
        </Intuitive>

        {/* --- Technical mode --- */}
        <Technical>
          <SubHeading id="autoregressive">Autoregressive Generation</SubHeading>
          <MathBlock>
            P(x<sub>1</sub>, &hellip;, x<sub>n</sub>) = &prod;
            <sub>t=1..n</sub> P(x<sub>t</sub> | x<sub>1</sub>, &hellip;, x
            <sub>t&minus;1</sub>)
          </MathBlock>
          <Prose>
            <p>
              Generation is inherently sequential and{" "}
              <strong>memory-bandwidth bound</strong> &mdash; most time is
              spent reading model weights from memory, not computing.
            </p>
          </Prose>

          <SubHeading id="sampling-formulas">Sampling Strategies</SubHeading>

          <Prose>
            <p>
              <strong>Temperature scaling:</strong>
            </p>
          </Prose>
          <MathBlock>
            P(w<sub>i</sub>) ={" "}
            <span className="text-blue-400">exp</span>(z<sub>i</sub> /{" "}
            <span className="text-emerald-400">T</span>) / &sum;<sub>j</sub>{" "}
            <span className="text-blue-400">exp</span>(z<sub>j</sub> /{" "}
            <span className="text-emerald-400">T</span>)
          </MathBlock>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-700 text-zinc-400">
                  <th className="py-2 pr-4">Temperature</th>
                  <th className="py-2 pr-4">Effect</th>
                  <th className="py-2">Distribution</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4 font-mono">T &rarr; 0</td>
                  <td className="py-2 pr-4">Argmax (greedy)</td>
                  <td className="py-2">One-hot</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4 font-mono">T = 1</td>
                  <td className="py-2 pr-4">Standard softmax</td>
                  <td className="py-2">Calibrated</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4 font-mono">T &gt; 1</td>
                  <td className="py-2 pr-4">More uniform</td>
                  <td className="py-2">Flatter, more random</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Prose>
            <p>
              <strong>Top-k sampling:</strong> Keep the top k logits, set rest to &minus;&infin;, renormalize:
            </p>
          </Prose>
          <MathBlock>
            P&prime;(w<sub>i</sub>) ={" "}
            <span className="text-blue-400">exp</span>(z<sub>i</sub>/T) / &sum;
            <sub>j &isin; top-k</sub>{" "}
            <span className="text-blue-400">exp</span>(z<sub>j</sub>/T)&ensp;
            if w<sub>i</sub> &isin; top-k,&ensp;0 otherwise
          </MathBlock>

          <Prose>
            <p>
              <strong>Top-p (nucleus) sampling:</strong> Dynamically choose the
              smallest set whose cumulative probability exceeds p (typically
              0.9&ndash;0.95). Adapts to model confidence &mdash; when
              confident, only 1&ndash;2 tokens qualify.
            </p>
          </Prose>

          <Collapsible title="Beam Search">
            <Prose>
              <p>
                Maintains B candidate sequences, expanding by the top B tokens
                at each step:
              </p>
            </Prose>
            <MathBlock>
              <span className="text-orange-400">Score</span>(y<sub>1:t</sub>) =
              &sum;<sub>i=1..t</sub>{" "}
              <span className="text-blue-400">log</span> P(y<sub>i</sub> | y
              <sub>&lt;i</sub>, x)
            </MathBlock>
            <Prose>
              <p>
                Length normalization prevents bias toward shorter sequences:
              </p>
            </Prose>
            <MathBlock>
              Score<sub>norm</sub> = (1 / |y|<sup>&alpha;</sup>) &middot; &sum;
              <sub>t</sub>{" "}
              <span className="text-blue-400">log</span> P(y<sub>t</sub> | y
              <sub>&lt;t</sub>)
            </MathBlock>
            <Prose>
              <p>
                Modern chatbots (Claude, ChatGPT) use sampling over beam search
                because diversity and naturalness matter more than finding the
                single most likely sequence.
              </p>
            </Prose>
          </Collapsible>

          <SubHeading id="kv-cache">KV Cache</SubHeading>
          <Prose>
            <p>
              The critical inference optimization. Without it, generating token
              t requires re-computing K, V for all previous tokens &mdash; O(n
              <sup>2</sup>) total. With caching, each new token only computes
              its own K/V and appends to the cache &mdash; O(n) total.
            </p>
          </Prose>
          <MathBlock>
            KV cache size = 2 &times; n<sub>layers</sub> &times; n
            <sub>heads</sub> &times; d<sub>head</sub> &times; n<sub>tokens</sub>{" "}
            &times; bytes/element
          </MathBlock>
          <Prose>
            <p>
              For LLaMA 2 70B (fp16) at 4096 tokens: ~10 GB. Optimizations
              include GQA (4&ndash;8x reduction), KV quantization (INT8/INT4),
              Paged Attention (vLLM), and token eviction. Benchmarks show 4.7x
              speedup with KV caching.
            </p>
          </Prose>
        </Technical>

        <FlashcardDeck
          title="Test Your Understanding: Inference"
          cards={[
            {
              question: "Why don't LLMs just always pick the highest-probability token?",
              answer: "Greedy decoding (always picking the top token) produces repetitive, boring text. Sampling introduces randomness weighted by probability, creating more natural and diverse output. Temperature controls the randomness level.",
            },
            {
              question: "What is the KV cache and why is it critical for performance?",
              answer: "During autoregressive generation, the Key and Value matrices for all previous tokens don't change. The KV cache stores these so they're computed once and reused. Without it, generating N tokens would require O(N²) attention computations instead of O(N).",
              hint: "Think about what stays constant as you generate each new token",
            },
            {
              question: "What's the difference between top-k and top-p (nucleus) sampling?",
              answer: "Top-k keeps only the K highest-probability tokens (fixed count). Top-p keeps the smallest set of tokens whose cumulative probability exceeds p (dynamic count). Top-p adapts to the confidence distribution — when the model is confident, fewer tokens qualify; when uncertain, more do.",
            },
          ]}
        />

        <KeyTakeaway title="Key Insight" icon="brain">
          Generation is fundamentally <strong>probabilistic, not deterministic</strong>. The same prompt can produce different outputs. This is a feature, not a bug — it enables creativity and diverse solutions. But it also means critical code needs human review.
        </KeyTakeaway>

        {/* ============================================================ */}
        {/*  5. WHAT MAKES LLMs POWERFUL (Both modes)                    */}
        {/* ============================================================ */}
        <SectionHeading id="powerful">
          4. What Makes LLMs Powerful
        </SectionHeading>

        <Both>
          <div className="space-y-6">
            <InfoCard title="Emergent Abilities">
              <p>
                Capabilities that appear at scale but are absent in smaller
                models &mdash; arithmetic, chain-of-thought reasoning, code
                generation. These arise as sharp phase transitions, though debate
                exists on whether this is an artifact of discrete evaluation
                metrics.
              </p>
            </InfoCard>

            <InfoCard title="In-Context Learning">
              <p>
                The ability to learn new tasks from a few examples in the prompt
                with <strong>no weight updates</strong>. Show the model three
                translations and it can translate a fourth. Research suggests the
                transformer&rsquo;s forward pass effectively implements gradient
                descent on the in-context examples &mdash; it has{" "}
                <em>learned to learn</em>.
              </p>
            </InfoCard>

            <InfoCard title="Chain-of-Thought Reasoning">
              <p>
                Asking the model to &ldquo;show its work&rdquo; dramatically
                improves reasoning. Each generated token is a forward pass
                through the entire network, so a 100-token reasoning chain gives
                100x more compute than a direct answer. Extended thinking
                (Claude, o1) takes this further with{" "}
                <strong>test-time compute scaling</strong> &mdash; more thinking
                tokens instead of a bigger model.
              </p>
            </InfoCard>

            <InfoCard title="Tool Use">
              <p>
                LLMs learn to generate structured JSON tool calls from training
                data. At inference, the model outputs a request, the harness
                executes the tool, and the result is fed back. The model never
                executes code itself &mdash; it only produces the request.
              </p>
            </InfoCard>

            <InfoCard title="The Scaling Effect">
              <p>
                Performance improvements from scaling have been remarkably
                predictable. Cross-domain transfer (code training improves
                reasoning), compositional generalization, and internal world
                models all emerge at scale. There is no evidence of a ceiling
                &mdash; each order of magnitude yields measurable improvement.
              </p>
            </InfoCard>
          </div>
        </Both>

        {/* ============================================================ */}
        {/*  6. CLAUDE CODE — THE AGENTIC LOOP                          */}
        {/* ============================================================ */}
        <SectionHeading id="claude-code">
          5. Claude Code &mdash; The Agentic Loop
        </SectionHeading>

        {/* --- Intuitive mode --- */}
        <Intuitive>
          <SubHeading>A Developer with Infinite Patience</SubHeading>
          <Prose>
            <p>
              Claude Code is a developer that never gets tired, never loses
              track, and can read your entire codebase. It works in a simple
              loop:
            </p>
          </Prose>
          <div className="my-6 space-y-3">
            {[
              {
                icon: "1",
                label: "Read",
                desc: "Gather context: read files, search code, check git history",
                color: "text-blue-400",
              },
              {
                icon: "2",
                label: "Think",
                desc: "Reason about the problem, form a plan, decide next action",
                color: "text-emerald-400",
              },
              {
                icon: "3",
                label: "Act",
                desc: "Edit files, run commands, create tests, verify results",
                color: "text-orange-400",
              },
            ].map((step) => (
              <div
                key={step.icon}
                className="flex items-start gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
              >
                <span className={`text-xl font-black ${step.color}`}>
                  {step.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-200">
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-sm text-zinc-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Prose>
            <p>
              This loop repeats until the task is complete. If a test fails,
              Claude sees the failure and adjusts. If it needs more context, it
              reads more files. The loop is self-correcting.
            </p>
          </Prose>

          <SubHeading>Tools: Hands for the Brain</SubHeading>
          <Prose>
            <p>
              The LLM is the brain, but it cannot directly touch the filesystem
              or run commands. Instead, it has <strong>tools</strong> &mdash;
              structured actions it can request:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <strong>Read, Edit, Write</strong> &mdash; file operations
              </li>
              <li>
                <strong>Bash</strong> &mdash; run shell commands, build, test
              </li>
              <li>
                <strong>Glob, Grep</strong> &mdash; search for files and content
              </li>
              <li>
                <strong>WebSearch, WebFetch</strong> &mdash; look things up
              </li>
            </ul>
            <p>
              The model says what it wants, the harness executes it, and the
              result is fed back as context for the next iteration.
            </p>
          </Prose>

          <SubHeading>Subagents: Delegating to Specialists</SubHeading>
          <Prose>
            <p>
              For large tasks, Claude can spawn <strong>subagents</strong>{" "}
              &mdash; separate workers with their own fresh context. Think of it
              like a lead developer delegating to teammates:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                &ldquo;Subagent 1: analyze the auth module and report
                findings&rdquo;
              </li>
              <li>
                &ldquo;Subagent 2: fix the failing tests in payments&rdquo;
              </li>
            </ul>
            <p>
              Each subagent does its work and returns a concise summary. The
              parent agent&rsquo;s context stays clean while getting the
              benefit of deep research.
            </p>
          </Prose>
        </Intuitive>

        {/* --- Technical mode --- */}
        <Technical>
          <SubHeading id="agent-loop">The Formal Agent Loop</SubHeading>
          <Prose>
            <p>
              An agent operates in an environment with:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <strong>State space S:</strong> Codebase, filesystem, terminal,
                git
              </li>
              <li>
                <strong>Action space A:</strong> Tool calls (read, edit, bash,
                search, ...)
              </li>
              <li>
                <strong>Transition function T(s, a) &rarr; s&prime;:</strong>{" "}
                How actions change state
              </li>
              <li>
                <strong>Observation function O(s&prime;) &rarr; o:</strong> Tool
                results the agent sees
              </li>
              <li>
                <strong>
                  Policy &pi;(o<sub>1</sub>, &hellip;, o<sub>t</sub>) &rarr; a
                  <sub>t</sub>:
                </strong>{" "}
                LLM decision conditioned on all prior observations
              </li>
            </ul>
            <p>
              The policy &pi; is frozen LLM weights + current context window.
              All &ldquo;learning&rdquo; within a session is via the growing
              context (in-context learning).
            </p>
          </Prose>

          <MermaidDiagram
            chart={`graph TD
    A["User Prompt"] --> B{"Claude Evaluates"}
    B -->|"Needs more info"| C["Gather Context"]
    C -->|"Read files, search"| B
    B -->|"Ready to act"| D["Take Action"]
    D -->|"Edit files, run commands"| B
    B -->|"Need to verify"| E["Verify Results"]
    E -->|"Run tests, check output"| B
    B -->|"Task complete"| F["Final Response"]`}
            className="my-6"
          />

          <SubHeading id="tool-protocol">Tool Call Protocol</SubHeading>
          <Prose>
            <p>
              Claude Code communicates tool calls through the Anthropic API&rsquo;s structured protocol:
            </p>
          </Prose>
          <CodeBlock title="API Response (tool_use)">
{`{
  "content": [
    { "type": "text", "text": "Let me read that file." },
    {
      "type": "tool_use",
      "id": "toolu_01XYZ",
      "name": "Read",
      "input": { "file_path": "/src/auth.ts" }
    }
  ],
  "stop_reason": "tool_use"
}`}
          </CodeBlock>
          <CodeBlock title="Tool Result (fed back to Claude)">
{`{
  "role": "user",
  "content": [{
    "type": "tool_result",
    "tool_use_id": "toolu_01XYZ",
    "content": "1\\timport { hash } from 'crypto';\\n2\\t..."
  }]
}`}
          </CodeBlock>

          <div className="my-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-700 text-zinc-400">
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Tools</th>
                  <th className="py-2">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {[
                  ["File ops", "Read, Edit, Write", "Read, modify, create files"],
                  ["Search", "Glob, Grep", "Find files, search content"],
                  ["Execution", "Bash", "Shell commands, build, test, git"],
                  ["Web", "WebSearch, WebFetch", "Search the internet, fetch docs"],
                  ["Orchestration", "Agent, Skill", "Spawn subagents, invoke skills"],
                ].map(([cat, tools, purpose]) => (
                  <tr key={cat} className="border-b border-zinc-800">
                    <td className="py-2 pr-4 text-zinc-500">{cat}</td>
                    <td className="py-2 pr-4 font-mono">{tools}</td>
                    <td className="py-2">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubHeading id="context-management">
            Context Window Management
          </SubHeading>
          <Prose>
            <p>
              The context window is the model&rsquo;s only state. When it
              approaches capacity, Claude Code automatically:
            </p>
            <ol className="list-inside list-decimal space-y-1">
              <li>Summarizes older conversation history</li>
              <li>Preserves recent exchanges and key decisions</li>
              <li>
                Re-injects persistent context (CLAUDE.md) fresh
              </li>
              <li>
                Emits a <code className="text-xs text-zinc-300">compact_boundary</code>{" "}
                message
              </li>
            </ol>
            <p>
              <strong>Prompt caching:</strong> Static content (system prompt,
              tools, CLAUDE.md) is prompt-cached by the API, reducing latency
              and cost by up to 90% on subsequent turns.
            </p>
          </Prose>

          <SubHeading id="subagents">Subagent Architecture</SubHeading>
          <MermaidDiagram
            chart={`graph TD
    P["Parent Agent\\nContext: 80% full"] -->|"Spawn"| S1["Subagent 1\\nTask: Analyze auth module\\nTools: Read, Grep"]
    P -->|"Spawn"| S2["Subagent 2\\nTask: Fix tests\\nTools: Read, Edit, Bash"]
    S1 -->|"Return summary"| P
    S2 -->|"Return summary"| P`}
            className="my-6"
          />
          <Prose>
            <p>
              Each subagent gets a fresh context window, receives only its task
              (not the full parent conversation), can have restricted tools, and
              returns a concise summary. Context isolation is the key benefit
              &mdash; a 50k-token file read produces only a 200-token summary
              for the parent.
            </p>
          </Prose>

          <SubHeading id="permissions">Permission Model</SubHeading>
          <Prose>
            <p>Defense-in-depth layers:</p>
            <ol className="list-inside list-decimal space-y-1">
              <li>
                <strong>Permission modes</strong> control default approval policy
              </li>
              <li>
                <strong>Allowed/disallowed tools</strong> with scoped rules
                (e.g., <code className="text-xs text-zinc-300">Bash(npm:*)</code>)
              </li>
              <li>
                <strong>Checkpoints</strong> snapshot files before every edit
              </li>
              <li>
                <strong>Budget/turn limits</strong> cap spend and iterations
              </li>
              <li>
                <strong>Safety classifier</strong> evaluates each action even in
                auto mode
              </li>
            </ol>
          </Prose>
        </Technical>

        <FlashcardDeck
          title="Test Your Understanding: Claude Code"
          cards={[
            {
              question: "What's the difference between a chatbot and an agent?",
              answer: "A chatbot maps input→output in one pass. An agent runs in a loop: observe state, decide action, execute, observe result, repeat. Agents can use tools, maintain state across steps, self-correct from errors, and decompose complex tasks into subtasks.",
            },
            {
              question: "Why does Claude Code use subagents instead of doing everything in one context?",
              answer: "Context window is finite. Complex tasks can fill it, degrading quality. Subagents get fresh, focused context for their specific subtask and return only a concise result. The parent stays lean and can orchestrate many tasks without context pollution.",
              hint: "Think about context window management",
            },
            {
              question: "What is worktree isolation and why does it matter for parallel agents?",
              answer: "Each subagent gets its own git worktree — a separate working copy of the repository. This means multiple agents can edit files simultaneously without merge conflicts. After each finishes, their changes are merged back sequentially.",
            },
            {
              question: "How does the tool-use protocol work?",
              answer: "The model outputs a structured JSON tool call (name + parameters). The harness validates and executes it, then feeds the result back as a new message. The model never executes code directly — it only produces requests. This is the key safety boundary.",
              hint: "The model is the brain, tools are the hands",
            },
          ]}
        />

        <KeyTakeaway title="Key Insight" icon="check">
          The power of an agent comes from the <strong>loop</strong>, not the model. A smarter model in a single-pass chatbot is less capable than a slightly weaker model in a well-designed agent loop with tools. The loop enables self-correction, multi-step reasoning, and real-world interaction.
        </KeyTakeaway>

        {/* ============================================================ */}
        {/*  7. MCP (MODEL CONTEXT PROTOCOL)                             */}
        {/* ============================================================ */}
        <SectionHeading id="mcp">
          6. MCP (Model Context Protocol)
        </SectionHeading>

        {/* --- Intuitive mode --- */}
        <Intuitive>
          <SubHeading>USB for AI</SubHeading>
          <Prose>
            <p>
              Remember when every phone had a different charger? USB-C fixed
              that &mdash; one standard port for everything. MCP does the same
              for AI tools.
            </p>
            <p>
              Before MCP, connecting an AI to GitHub, Slack, a database, or
              Sentry required a <strong>custom integration for every combination</strong>.
              Three AI models and five tools? That is 15 custom adapters, each
              with its own schema, auth, and error handling.
            </p>
          </Prose>

          <SubHeading>
            The N&times;M Problem &rarr; N+M Solution
          </SubHeading>
          <div className="my-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-red-800/50 bg-red-950/20 p-4">
              <p className="mb-2 text-xs font-bold text-red-400">
                Without MCP: N &times; M integrations
              </p>
              <p className="text-xs text-zinc-400">
                3 models &times; 5 tools = 15 custom adapters. Each with its own
                update cycle, auth flow, and error handling.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-800/50 bg-emerald-950/20 p-4">
              <p className="mb-2 text-xs font-bold text-emerald-400">
                With MCP: N + M implementations
              </p>
              <p className="text-xs text-zinc-400">
                3 models + 5 tools = 8 implementations. Each AI implements MCP
                client once. Each tool implements MCP server once. Any client
                connects to any server.
              </p>
            </div>
          </div>

          <SubHeading>How It Works: Host &rarr; Client &rarr; Server</SubHeading>
          <Prose>
            <p>
              The architecture is simple:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <strong>Host</strong> (Claude Code, VS Code) = the AI
                application
              </li>
              <li>
                <strong>Client</strong> = a connector inside the host that
                talks to one server
              </li>
              <li>
                <strong>Server</strong> = a program that provides tools
                (filesystem, GitHub, database, etc.)
              </li>
            </ul>
            <p>
              The host creates one client per server. Each client maintains a
              dedicated connection. When the AI wants to use a tool, the request
              flows through the client to the appropriate server.
            </p>
          </Prose>
          <MermaidDiagram
            chart={`graph LR
    Host["AI Host\\n(Claude Code)"] --> C1["Client 1"]
    Host --> C2["Client 2"]
    Host --> C3["Client 3"]
    C1 --> S1["Filesystem\\nServer"]
    C2 --> S2["GitHub\\nServer"]
    C3 --> S3["Database\\nServer"]`}
            className="my-6"
          />
        </Intuitive>

        {/* --- Technical mode --- */}
        <Technical>
          <SubHeading id="mcp-architecture">Architecture</SubHeading>
          <Prose>
            <p>
              MCP is a <strong>stateful, JSON-RPC 2.0-based protocol</strong>{" "}
              introduced by Anthropic in November 2024. It has two layers:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <strong>Data Layer:</strong> JSON-RPC messages, lifecycle
                management, three core primitives (tools, resources, prompts)
              </li>
              <li>
                <strong>Transport Layer:</strong> How messages are physically
                exchanged &mdash; stdio or Streamable HTTP
              </li>
            </ul>
          </Prose>

          <MermaidDiagram
            chart={`graph TB
    subgraph Host["MCP Host (e.g., Claude Code)"]
        C1["MCP Client 1"]
        C2["MCP Client 2"]
        C3["MCP Client 3"]
    end
    S1["MCP Server A\\nFilesystem (Local)"]
    S2["MCP Server B\\nPostgres (Local)"]
    S3["MCP Server C\\nSentry (Remote)"]
    C1 ---|"stdio"| S1
    C2 ---|"stdio"| S2
    C3 ---|"HTTP/SSE"| S3`}
            className="my-6"
          />

          <SubHeading id="jsonrpc">JSON-RPC 2.0 Protocol</SubHeading>
          <Prose>
            <p>
              Three message types: <strong>Request</strong> (expects response),{" "}
              <strong>Response</strong> (answers request),{" "}
              <strong>Notification</strong> (fire-and-forget, no id).
            </p>
          </Prose>
          <CodeBlock title="Request: tools/call">
{`{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "get_weather",
    "arguments": { "location": "Paris" }
  }
}`}
          </CodeBlock>
          <CodeBlock title="Response">
{`{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      { "type": "text", "text": "22C, partly cloudy" }
    ]
  }
}`}
          </CodeBlock>

          <SubHeading id="three-primitives">The Three Primitives</SubHeading>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-700 text-zinc-400">
                  <th className="py-2 pr-4">Primitive</th>
                  <th className="py-2 pr-4">Role</th>
                  <th className="py-2 pr-4">Control</th>
                  <th className="py-2">Discovery</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4 font-semibold text-orange-400">
                    Tools
                  </td>
                  <td className="py-2 pr-4">
                    Executable functions (&ldquo;verbs&rdquo;)
                  </td>
                  <td className="py-2 pr-4">Model-controlled</td>
                  <td className="py-2 font-mono">tools/list</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4 font-semibold text-blue-400">
                    Resources
                  </td>
                  <td className="py-2 pr-4">
                    Data sources (&ldquo;nouns&rdquo;)
                  </td>
                  <td className="py-2 pr-4">App-controlled</td>
                  <td className="py-2 font-mono">resources/list</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4 font-semibold text-emerald-400">
                    Prompts
                  </td>
                  <td className="py-2 pr-4">
                    Reusable templates (&ldquo;patterns&rdquo;)
                  </td>
                  <td className="py-2 pr-4">User-controlled</td>
                  <td className="py-2 font-mono">prompts/list</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Collapsible title="Tool schema example">
            <CodeBlock title="tools/list response">
{`{
  "name": "get_weather",
  "title": "Weather Information Provider",
  "description": "Get current weather for a location",
  "inputSchema": {
    "type": "object",
    "properties": {
      "location": { "type": "string" },
      "units": { "type": "string", "enum": ["metric", "imperial"] }
    },
    "required": ["location"]
  },
  "outputSchema": {
    "type": "object",
    "properties": {
      "temperature": { "type": "number" },
      "conditions": { "type": "string" }
    }
  }
}`}
            </CodeBlock>
          </Collapsible>

          <SubHeading id="connection-lifecycle">Connection Lifecycle</SubHeading>
          <MermaidDiagram
            chart={`sequenceDiagram
    participant Client
    participant Server
    Client->>Server: initialize (protocolVersion, capabilities, clientInfo)
    Server->>Client: initialize response (capabilities, serverInfo)
    Client->>Server: notifications/initialized
    Note over Client,Server: Operation Phase
    Client->>Server: tools/list
    Server->>Client: tools (array of tool definitions)
    Client->>Server: tools/call
    Server->>Client: result (content)
    Note over Client,Server: Shutdown Phase
    Client->>Server: close stdin / HTTP DELETE`}
            className="my-6"
          />

          <Collapsible title="Capability negotiation details">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-700 text-zinc-400">
                    <th className="py-2 pr-4">Category</th>
                    <th className="py-2 pr-4">Capability</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  {[
                    ["Client", "roots", "Provides filesystem roots to server"],
                    ["Client", "sampling", "Supports LLM sampling requests from server"],
                    ["Client", "elicitation", "Supports server requesting user input"],
                    ["Server", "tools", "Exposes callable tools"],
                    ["Server", "resources", "Provides readable resources"],
                    ["Server", "prompts", "Offers prompt templates"],
                    ["Server", "logging", "Emits structured log messages"],
                  ].map(([cat, cap, desc]) => (
                    <tr key={cap} className="border-b border-zinc-800">
                      <td className="py-2 pr-4 text-zinc-500">{cat}</td>
                      <td className="py-2 pr-4 font-mono">{cap}</td>
                      <td className="py-2">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Collapsible>

          <SubHeading id="mcp-security">Security Model</SubHeading>
          <Prose>
            <p>Key security principles:</p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <strong>OAuth 2.1 with PKCE</strong> for authentication
                (Resource Indicators RFC 8707)
              </li>
              <li>
                <strong>Origin validation</strong> on all HTTP requests (DNS
                rebinding defense)
              </li>
              <li>
                <strong>Capability negotiation as security boundary</strong>{" "}
                &mdash; no mid-session escalation
              </li>
              <li>
                <strong>Human-in-the-loop</strong> for tool approval
              </li>
              <li>
                <strong>Input validation:</strong>{" "}
                <code className="text-xs text-zinc-300">additionalProperties: false</code>{" "}
                at every nesting level, anchored regex patterns
              </li>
            </ul>
          </Prose>

          <Collapsible title="Threat model">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-700 text-zinc-400">
                    <th className="py-2 pr-4">Attack</th>
                    <th className="py-2 pr-4">Description</th>
                    <th className="py-2">Mitigation</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  {[
                    ["Tool Poisoning", "Malicious instructions in tool descriptions", "Description signing, hash verification"],
                    ["Rug Pull", "Benign tool swapped for malicious one after approval", "Material change detection, re-approval"],
                    ["Confused Deputy", "Server lacks user context, enabling privilege escalation", "Per-user auth with token exchange"],
                    ["Prompt Injection", "Malicious prompts via sampling/complete", "Context isolation, detection monitoring"],
                    ["Command Injection", "Direct exploitation of client/server process", "Input validation, sandboxing"],
                  ].map(([attack, desc, mitigation]) => (
                    <tr key={attack} className="border-b border-zinc-800">
                      <td className="py-2 pr-4 font-semibold text-red-400">
                        {attack}
                      </td>
                      <td className="py-2 pr-4">{desc}</td>
                      <td className="py-2">{mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Collapsible>

          <SubHeading id="mcp-comparison">
            Comparison: MCP vs Function Calling vs LangChain vs A2A
          </SubHeading>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-700 text-zinc-400">
                  <th className="py-2 pr-3">Feature</th>
                  <th className="py-2 pr-3">OpenAI FC</th>
                  <th className="py-2 pr-3">LangChain</th>
                  <th className="py-2 pr-3">MCP</th>
                  <th className="py-2">A2A</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {[
                  ["Open standard", "No", "OSS", "Yes", "Yes"],
                  ["Tool discovery", "No", "No", "Yes", "Agent Cards"],
                  ["Multi-model", "No", "Yes", "Yes", "Yes"],
                  ["Bidirectional", "No", "No", "Yes", "Yes"],
                  ["Agent-to-agent", "No", "Chains", "No", "Yes"],
                  ["Wire protocol", "HTTP/JSON", "In-process", "JSON-RPC", "REST/HTTP"],
                  ["Ecosystem", "Medium", "Large", "Very Large", "Growing"],
                ].map(([feature, fc, lc, mcp, a2a]) => (
                  <tr key={feature} className="border-b border-zinc-800">
                    <td className="py-2 pr-3 text-zinc-500">{feature}</td>
                    <td className="py-2 pr-3">{fc}</td>
                    <td className="py-2 pr-3">{lc}</td>
                    <td className="py-2 pr-3 font-semibold text-emerald-400">
                      {mcp}
                    </td>
                    <td className="py-2">{a2a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Prose>
            <p>
              <strong>Key insight:</strong> MCP is for{" "}
              <em>agent-to-tool</em> communication (vertical), while A2A is for{" "}
              <em>agent-to-agent</em> communication (horizontal). They are
              complementary, not competing.
            </p>
          </Prose>
        </Technical>

        <FlashcardDeck
          title="Test Your Understanding: MCP"
          cards={[
            {
              question: "What problem does MCP solve that function calling doesn't?",
              answer: "Function calling is model-specific (OpenAI, Anthropic, Google each have different formats) and requires the host to implement every tool. MCP is a universal protocol — any MCP client connects to any MCP server. It turns N×M integrations into N+M implementations.",
              hint: "Think about the N×M vs N+M problem",
            },
            {
              question: "What are the three MCP primitives?",
              answer: "Tools (functions the model can call), Resources (data the model can read, exposed via URIs), and Prompts (reusable prompt templates with arguments). Tools are model-controlled, Resources are application-controlled, Prompts are user-controlled.",
            },
            {
              question: "How does MCP handle security for tool execution?",
              answer: "MCP uses capability negotiation (servers declare what they can do), human-in-the-loop tool approval (the host can require user confirmation), OAuth 2.1 for auth, and transport-level security (TLS). The host mediates all communication — the model never directly contacts servers.",
              hint: "The host is the security boundary",
            },
          ]}
        />

        <KeyTakeaway title="Key Insight" icon="lightbulb">
          MCP is to AI tools what <strong>USB is to peripherals</strong>. Before USB, every device needed its own port and driver. MCP creates a standard protocol so any AI can use any tool. This is what makes Claude Code extensible — adding a new capability is just adding a new MCP server, not rewriting the agent.
        </KeyTakeaway>

        {/* ============================================================ */}
        {/*  8. WHY THIS STACK IS POWERFUL (Both modes)                  */}
        {/* ============================================================ */}
        <SectionHeading id="why-stack">
          7. Why This Stack is Powerful
        </SectionHeading>

        <Both>
          <SubHeading>The Compound Effect</SubHeading>
          <Prose>
            <p>
              Each component alone has limited capability. Their combination
              creates something qualitatively different:
            </p>
          </Prose>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-700 text-zinc-400">
                  <th className="py-2 pr-4">Component</th>
                  <th className="py-2 pr-4">Alone</th>
                  <th className="py-2">Combined</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {[
                  ["LLM", "Can reason about text", "Can reason about code, then edit it"],
                  ["Tools", "Can run commands", "Commands informed by understanding, results feed back"],
                  ["Context", "Raw information", "LLM extracts meaning, makes connections"],
                  ["Planning", "Abstract strategy", "Strategy decomposed into verified tool calls"],
                ].map(([comp, alone, combined]) => (
                  <tr key={comp} className="border-b border-zinc-800">
                    <td className="py-2 pr-4 font-semibold text-zinc-200">
                      {comp}
                    </td>
                    <td className="py-2 pr-4">{alone}</td>
                    <td className="py-2">{combined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubHeading>Current Limitations (Honest Assessment)</SubHeading>
          <div className="my-4 space-y-2">
            {[
              {
                title: "Reliability",
                desc: "LLMs are probabilistic. The same prompt can produce different results. Critical operations need human review.",
              },
              {
                title: "Hallucination",
                desc: "Models can generate plausible but incorrect code, especially for less common libraries. They may invent API methods that don't exist.",
              },
              {
                title: "Context window bottleneck",
                desc: "Despite advances, the context window is finite. Very large codebases cannot be fully loaded.",
              },
              {
                title: "Reasoning ceiling",
                desc: "Current models struggle with deeply nested logic, complex state tracking, and truly novel algorithmic problems.",
              },
              {
                title: "Security surface",
                desc: "Agentic systems that can read files, run commands, and make network requests introduce significant attack surface.",
              },
              {
                title: "Cost",
                desc: "High-quality generation from large models remains expensive. Complex multi-step tasks can cost dollars per task.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-zinc-200">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <SubHeading>Where We Are Heading</SubHeading>
          <Prose>
            <p>
              The scaling hypothesis predicts continued improvement along
              multiple axes:
            </p>
            <ul className="list-inside list-disc space-y-1">
              <li>
                <strong>Model quality:</strong> Better reasoning, code
                understanding, and instruction following
              </li>
              <li>
                <strong>Tool ecosystem:</strong> More MCP servers = more
                capabilities with zero model changes
              </li>
              <li>
                <strong>Context length:</strong> Longer windows enable more
                complex tasks and more turns before compaction
              </li>
              <li>
                <strong>Inference cost:</strong> Decreasing costs allow deeper
                exploration and more subagents
              </li>
              <li>
                <strong>Compound improvement:</strong> A 2x better model with 2x
                more tools in a 2x larger context yields far more than 2x
                capability improvement
              </li>
            </ul>
          </Prose>
        </Both>

        {/* ---- Footer spacing ---- */}
        <div className="mt-20" />
      </div>
    </DepthProvider>
  );
}
