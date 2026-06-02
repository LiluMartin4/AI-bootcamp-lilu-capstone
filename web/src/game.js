const MARKET_STORES = [
  {
    name: 'Ember Anvil Forge Supplies',
    items: [
      { name: 'Forged Spearhead', cost: 18 },
      { name: 'Tempered Nails', cost: 6 },
      { name: 'Hammer Grip Wrap', cost: 8 }
    ]
  },
  {
    name: 'River Salt Fishmonger',
    items: [
      { name: 'Smoked Fish', cost: 7 },
      { name: 'Salt Packet', cost: 4 },
      { name: 'Boat Rumor Note', cost: 10 }
    ]
  },
  {
    name: 'Moonthread Clothier',
    items: [
      { name: 'Travel Cloak', cost: 16 },
      { name: 'Disguise Hood', cost: 14 },
      { name: 'Padded Gloves', cost: 9 }
    ]
  },
  {
    name: 'Lantern and Wick Chandlery',
    items: [
      { name: 'Lantern Oil', cost: 5 },
      { name: 'Signal Candle', cost: 6 },
      { name: 'Moonwater Flask', cost: 13 }
    ]
  },
  {
    name: 'Ironroot Herbalist',
    items: [
      { name: 'Herbal Tonic', cost: 9 },
      { name: 'Antivenom', cost: 15 },
      { name: 'Lake Charm', cost: 20 }
    ]
  },
  {
    name: 'Crown Ledger Pawn and Trade',
    items: [
      { name: 'Royal Crest Token', cost: 24 },
      { name: 'Old Coin Set', cost: 11 },
      { name: 'Guard Ledger Copy', cost: 12 }
    ]
  },
  {
    name: 'Three Crows Curios',
    items: [
      { name: 'Silver Bell', cost: 22 },
      { name: 'Bone Charm', cost: 12 },
      { name: 'Ritual Powder', cost: 14 }
    ]
  },
  {
    name: 'Dawnbread Bakery',
    items: [
      { name: 'Bread Loaf', cost: 3 },
      { name: 'Travel Pie', cost: 6 },
      { name: 'Honey Cake', cost: 5 }
    ]
  },
  {
    name: "Mapmaker's Nook",
    items: [
      { name: 'Forest Map', cost: 12 },
      { name: 'Hidden Trail Markers', cost: 16 },
      { name: 'Lake Shore Sketch', cost: 9 }
    ]
  },
  {
    name: 'Stable and Tack House',
    items: [
      { name: 'Riding Kit', cost: 18 },
      { name: 'Trail Rope', cost: 8 },
      { name: 'Saddle Bag', cost: 10 }
    ]
  },
  {
    name: 'Bell and Brass Repairs',
    items: [
      { name: 'Bell Clapper', cost: 7 },
      { name: 'Brass Ring', cost: 6 },
      { name: 'Tone Tuner', cost: 11 }
    ]
  },
  {
    name: 'Whisper Alley Contraband Stall',
    items: [
      { name: 'Prison Lockpick', cost: 19 },
      { name: 'Bandit Signet', cost: 17 },
      { name: 'Silent Boots', cost: 15 }
    ]
  }
];

const STORY_NODES = {
  node0: {
    title: 'Opening at the Kingdom Forge',
    text: [
      'Before sunrise, the blacksmith works a hot forge as rumors spread that the missing princess may be tied to the roaring lake in the forest.',
      'A royal messenger arrives while a guard, a merchant, and a frightened child all demand attention.'
    ],
    options: [
      { text: 'Close the forge and ride to the castle immediately.', next: 'node1' },
      { text: 'Stay and complete paid work for extra gold.', next: 'node2' },
      { text: 'Go to the market first for rumors and supplies.', next: 'node3' },
      { text: 'Visit the guard barracks for official reports.', next: 'node4' },
      { text: 'Follow tavern gossip before deciding.', next: 'node5' }
    ]
  },
  node1: {
    title: 'Royal Mission',
    text: [
      'Queen Edrin asks the blacksmith to investigate the lake and recover proof about the princess.',
      'Captain Brann watches closely while Mage Ilya appears uneasy.'
    ],
    options: [
      { text: 'Leave for the forest immediately.', next: 'node6', effects: { gold: 10 } },
      { text: 'Request access to the archives first.', next: 'node7' },
      { text: 'Request a guard escort.', next: 'node8' },
      { text: 'Question Mage Ilya in private.', next: 'node9' }
    ]
  },
  node2: {
    title: 'Forge Income Branch',
    text: [
      'The blacksmith chooses income first, taking commissions while the palace grows impatient.',
      'Legal work is steady, but risky jobs can bring fast money.'
    ],
    options: [
      {
        text: 'Work honest contracts all day. (+15 gold)',
        next: 'node1',
        effects: { gold: 15 }
      },
      {
        text: 'Take expensive rush jobs for nobles. (+25 gold)',
        next: 'node10',
        effects: { gold: 25 }
      },
      {
        text: 'Craft criminal tools for underworld clients. (+30 gold)',
        next: 'node12',
        effects: { gold: 30, reputation: 'criminal' }
      },
      { text: 'Stop work and report to the palace by nightfall.', next: 'node1' }
    ]
  },
  node3: {
    title: 'Market Hub Branch',
    text: [
      'The market is crowded with shops, clues, and risk. Merchant Dala hints that ritual goods are being moved toward the forest.',
      "Use 'stores' to view all shops and 'buy <store> <item>' to purchase while you are in market nodes."
    ],
    marketEnabled: true,
    options: [
      { text: 'Buy supplies and prepare for travel.', next: 'node6' },
      { text: 'Ask shopkeepers about lake rumors.', next: 'node7' },
      {
        text: 'Attempt theft from a high-value stall. (+20 gold)',
        next: 'node12',
        effects: { gold: 20, reputation: 'criminal' }
      },
      { text: 'Accept a legal courier job. (+12 gold)', next: 'node13', effects: { gold: 12 } },
      { text: 'Meet an underworld contact after dusk.', next: 'node15' }
    ]
  },
  node4: {
    title: 'Guard Branch',
    text: [
      'Captain Brann shares reports of tracks that look human and monstrous at once.',
      'The blacksmith can cooperate with the law or bend it.'
    ],
    options: [
      { text: 'Join sanctioned patrol.', next: 'node8' },
      { text: 'Request prison access to question Poacher Rook.', next: 'node14' },
      { text: 'Bribe guards for restricted evidence. (-10 gold)', next: 'node12', effects: { gold: -10 } },
      { text: 'Reject oversight and go alone.', next: 'node6' }
    ]
  },
  node5: {
    title: 'Tavern Branch',
    text: [
      'Mora and Finch describe hearing a human-like cry from the lake.',
      'A masked stranger named Vey offers a dangerous shortcut.'
    ],
    options: [
      { text: "Trust Finch's safer map.", next: 'node6' },
      { text: "Follow Vey's shortcut.", next: 'node15' },
      { text: 'Buy pendant fragment. (-8 gold, gain item)', next: 'node16', effects: { gold: -8, addItem: 'Princess Pendant Fragment' } },
      { text: 'Start a tavern fight.', next: 'node14' },
      { text: 'Return to the queen with rumors.', next: 'node1' }
    ]
  },
  node6: {
    title: 'Forest Road (Main Arc Convergence)',
    text: [
      'The blacksmith reaches the forest. Lake wind carries echoes that sound like old court lullabies.',
      'Hunter signs and abandoned camps suggest many did not return.'
    ],
    onEnter: { addItem: ['Hunter Rope', 'Old Lullaby Sheet'] },
    options: [
      { text: 'Investigate shrine route.', next: 'node17' },
      { text: 'Follow tracks to the lake.', next: 'node18' },
      { text: 'Camp and observe overnight.', next: 'node19' },
      { text: 'Search abandoned camps.', next: 'node20' },
      { text: 'Return to market for better supplies.', next: 'node3' }
    ]
  },
  node7: {
    title: 'Archive Research',
    text: [
      'Archivist Sen uncovers records of a ritual binding a royal soul to lake spirits.',
      'Notes mention a crest, a bell tone, and a lullaby rhythm.'
    ],
    options: [
      { text: 'Copy notes and leave for the forest.', next: 'node17' },
      { text: 'Share findings with Mage Ilya.', next: 'node9' },
      { text: 'Sell copied notes for fast gold. (+14 gold)', next: 'node3', effects: { gold: 14 } },
      { text: 'Burn the notes in fear.', next: 'node22' }
    ]
  },
  node8: {
    title: 'Escort Trouble',
    text: [
      'The escort panics near the lake. One guard flees and another refuses to move.',
      'The blacksmith must lead, persuade, or abandon them.'
    ],
    options: [
      { text: 'Continue alone.', next: 'node6' },
      { text: 'Persuade guard to continue.', next: 'node6', effects: { gold: -2 } },
      { text: 'Threaten guard into obedience.', next: 'node23', effects: { reputation: 'criminal' } },
      { text: 'Retreat to city and regroup.', next: 'node3' }
    ]
  },
  node9: {
    title: 'Mage Secrets',
    text: [
      'Mage Ilya admits the royal family attempted a hidden transformation ritual.',
      'They offer a Lake Charm and ask for silence.'
    ],
    options: [
      { text: 'Accept charm and keep secret. (+Lake Charm)', next: 'node17', effects: { addItem: 'Lake Charm' } },
      { text: 'Demand full confession.', next: 'node24' },
      { text: 'Expose mage publicly.', next: 'node14' },
      { text: 'Threaten mage for gold. (+18 gold)', next: 'node12', effects: { gold: 18, reputation: 'criminal' } }
    ]
  },
  node10: {
    title: 'Noble Favor Branch',
    text: [
      'Nobles reward the blacksmith for rushed commissions, but expect political loyalty in return.'
    ],
    marketEnabled: true,
    options: [
      { text: 'Use favor to gain court access.', next: 'node1' },
      { text: 'Spend favor and gold in the market.', next: 'node3' },
      { text: 'Fail noble request and face punishment.', next: 'node14' }
    ]
  },
  node12: {
    title: 'Theft and Crime Branch',
    text: [
      'The blacksmith steals for rapid wealth. Success pays well, but bounty risk rises quickly.'
    ],
    options: [
      { text: 'Pickpocket a wealthy courier. (+20 gold)', next: 'node25', effects: { gold: 20, reputation: 'criminal' } },
      { text: 'Break into Three Crows Curios. (+Silver Bell)', next: 'node26', effects: { addItem: 'Silver Bell', reputation: 'criminal' } },
      { text: 'Join Vey in a warehouse heist. (+22 gold)', next: 'node15', effects: { gold: 22, reputation: 'criminal' } },
      { text: 'Stop stealing and return to legal work.', next: 'node2' }
    ]
  },
  node13: {
    title: 'Courier Side Quest',
    text: [
      'A legal courier route pays fairly and reveals safe trails toward the forest edge.'
    ],
    options: [
      { text: 'Complete delivery honestly. (+10 gold)', next: 'node6', effects: { gold: 10 } },
      { text: 'Open the parcel and steal contents. (+16 gold)', next: 'node12', effects: { gold: 16, reputation: 'criminal' } },
      { text: 'Report suspicious parcel to guards.', next: 'node4' }
    ]
  },
  node14: {
    title: 'Prison Side Quest',
    text: [
      'The blacksmith spends multiple days in prison with poachers, smugglers, and scholars.'
    ],
    options: [
      { text: 'Serve sentence and gather information.', next: 'node6' },
      { text: 'Escape through damaged stonework.', next: 'node27', effects: { reputation: 'criminal' } },
      { text: 'Trade lockpick for route map. (+Prison Lockpick)', next: 'node20', effects: { addItem: 'Prison Lockpick' } },
      { text: 'Betray cellmates for early release.', next: 'node1', effects: { gold: -5 } }
    ]
  },
  node15: {
    title: 'Bandit Contact',
    text: [
      'Vey offers a criminal alliance with fast coin and dangerous obligations.'
    ],
    options: [
      { text: 'Refuse and leave for the forest.', next: 'node6' },
      { text: 'Take the job for payment. (+18 gold)', next: 'node27', effects: { gold: 18, reputation: 'criminal', addItem: 'Bandit Signet' } },
      { text: 'Infiltrate bandits and gather clues.', next: 'node20' }
    ]
  },
  node16: {
    title: 'Pendant Clue Branch',
    text: [
      'The pendant fragment bears the royal crest and strengthens the case that the princess is tied to the lake curse.'
    ],
    options: [
      { text: 'Head to the forest with this clue.', next: 'node18' },
      { text: 'Show pendant to the queen.', next: 'node1' },
      { text: 'Sell pendant for gold. (+12 gold)', next: 'node3', effects: { gold: 12 } }
    ]
  },
  node17: {
    title: 'Shrine Revelation (Main Arc)',
    text: [
      'Shrine Keeper Oren confirms the lake monster carries the princess soul.',
      'A careful approach and ritual components may soften the curse.'
    ],
    options: [
      { text: 'Approach lake with crest and lullaby.', next: 'node18' },
      { text: 'Build forged spear trap.', next: 'node28', effects: { addItem: 'Forged Spearhead' } },
      { text: 'Wait for moonrise ritual window.', next: 'node29' },
      { text: 'Return to town for one last missing item.', next: 'node3' }
    ]
  },
  node18: {
    title: 'First Monster Encounter',
    text: [
      'The giant sea monster rises from black water with royal-blue scales and a broken pendant chain.',
      'Its behavior changes if the blacksmith carries key relics.'
    ],
    options: [
      { text: "Speak the princess's name.", next: 'node30' },
      { text: 'Ring the Silver Bell.', next: 'node30', requiresItem: 'Silver Bell' },
      { text: 'Attack first.', next: 'node28' },
      { text: 'Retreat and regroup.', next: 'node17' },
      { text: 'Offer food and test response.', next: 'node20' }
    ]
  },
  node19: {
    title: 'Night Attack',
    text: [
      'At night, shapes move between trees and the camp is attacked.',
      'The blacksmith can survive, retreat, or fall.'
    ],
    options: [
      { text: 'Fight through the attack.', next: 'node17' },
      { text: 'Retreat and regroup in town.', next: 'node3' },
      { text: 'Fail to escape.', next: 'endingDeath' }
    ]
  },
  node20: {
    title: 'Traveler Clues',
    text: [
      'Abandoned camps hold evidence, including traces of royal fabric and old songs etched into wood.'
    ],
    onEnter: { addItem: ['Princess Pendant Fragment'] },
    options: [
      { text: 'Return to the shrine with new evidence.', next: 'node17' },
      { text: 'Take clues back to the queen.', next: 'node1' },
      { text: 'Sell findings for gold. (+10 gold)', next: 'node3', effects: { gold: 10 } }
    ]
  },
  node22: {
    title: 'Bad Ending - Ignorance',
    text: [
      'Destroying the ritual notes leaves the blacksmith without the truth.',
      'The lake curse worsens and the kingdom falls deeper into fear.'
    ],
    end: true
  },
  node23: {
    title: 'Escort Mutiny',
    text: [
      'The escort mutinies under pressure. The blacksmith must submit, flee, or press on alone.'
    ],
    options: [
      { text: 'Submit and face arrest.', next: 'node14' },
      { text: 'Escape and continue as a fugitive.', next: 'node27' },
      { text: 'Force a lone push into the forest.', next: 'node6' }
    ]
  },
  node24: {
    title: 'Political Side Quest',
    text: [
      'Court factions fight over responsibility for the curse. The blacksmith can secure support for the final rite.'
    ],
    options: [
      { text: 'Broker peace between queen and mage.', next: 'node17' },
      { text: 'Demand payment for silence. (+20 gold)', next: 'node3', effects: { gold: 20 } },
      { text: 'Expose everyone and trigger panic.', next: 'node14' }
    ]
  },
  node25: {
    title: 'Street Chase',
    text: [
      'A theft turns into a chase through alleys and rooftops. Guards are close.'
    ],
    options: [
      { text: 'Surrender.', next: 'node14' },
      { text: 'Escape into undercity tunnels.', next: 'node27' },
      { text: 'Slip away and return to market.', next: 'node3' }
    ]
  },
  node26: {
    title: 'Curio Break-In',
    text: [
      'The curio break-in yields rare relics, but alarms ring through the district.'
    ],
    options: [
      { text: 'Flee with relics. (+14 gold)', next: 'node12', effects: { gold: 14, addItem: 'Silver Bell' } },
      { text: 'Get caught by guards.', next: 'node14' },
      { text: 'Hide and return to legal work.', next: 'node2' }
    ]
  },
  node27: {
    title: 'Fugitive Path',
    text: [
      'Wanted posters spread across the kingdom. The blacksmith survives by stealth and risky contacts.'
    ],
    options: [
      { text: 'Sneak back to forest routes.', next: 'node6' },
      { text: 'Attempt one last major robbery.', next: 'endingExecution' },
      { text: 'Disguise and return to market.', next: 'node3' }
    ]
  },
  node28: {
    title: 'Violent Confrontation',
    text: [
      'Violence at the lake causes chaos. The blacksmith may still pull back, but tragedy is near.'
    ],
    options: [
      { text: 'Drop weapons and attempt dialogue.', next: 'node30' },
      { text: 'Press the attack.', next: 'endingDeath' },
      { text: 'Retreat to shrine and regroup.', next: 'node17' }
    ]
  },
  node29: {
    title: 'Ritual Attempt',
    text: [
      'The moonlit ritual can stabilize the curse or fail catastrophically depending on preparation.'
    ],
    options: [
      { text: 'Proceed with full ritual components.', next: 'node30' },
      { text: 'Attempt with partial components.', next: 'endingCatastrophe' },
      { text: 'Abort and return to planning.', next: 'node17' }
    ]
  },
  node30: {
    title: 'True Confrontation (Main Arc Climax)',
    text: [
      'The blacksmith confirms the sea monster is the transformed princess.',
      'The final choice decides the fate of both kingdom and curse.'
    ],
    options: [
      { text: 'Offer forged crest-blade to absorb curse.', next: 'endingA' },
      { text: 'Lead joint ritual with queen, mage, and shrine keeper.', next: 'endingB' },
      { text: 'Refuse sacrifice and leave curse untouched.', next: 'endingC' },
      { text: 'Remain at lake as lifelong guardian.', next: 'endingD' }
    ]
  },
  endingA: {
    title: 'Ending A: Bittersweet Salvation',
    text: [
      'The curse is weakened, the princess soul is heard clearly again, and the kingdom survives.',
      'The blacksmith pays a heavy personal cost but becomes a legend.'
    ],
    end: true
  },
  endingB: {
    title: 'Ending B: Hard-Won Restoration',
    text: [
      'Through cooperation and ritual discipline, the curse is stabilized and hope returns to the court.'
    ],
    end: true
  },
  endingC: {
    title: 'Ending C: Kingdom in Fear',
    text: [
      'The curse remains. The kingdom survives, but fear and unrest spread for years.'
    ],
    end: true
  },
  endingD: {
    title: 'Ending D: Exile Guardian',
    text: [
      'The blacksmith leaves the kingdom behind and guards the lake in solitude.'
    ],
    end: true
  },
  endingExecution: {
    title: 'Bad Ending: Execution as Outlaw',
    text: ['The blacksmith is captured after escalating crimes and executed by royal decree.'],
    end: true
  },
  endingDeath: {
    title: 'Bad Ending: Death in the Wilds',
    text: ['The blacksmith falls before uncovering the final truth of the lake.'],
    end: true
  },
  endingCatastrophe: {
    title: 'Bad Ending: Ritual Catastrophe',
    text: ['The ritual collapses, the curse surges, and both forest and kingdom suffer ruin.'],
    end: true
  }
};

const MARKET_NODE_IDS = new Set(['node3', 'node10']);

const formatNodeLines = (state) => {
  const node = STORY_NODES[state.nodeId];
  const lines = ['', node.title, ...node.text];

  if (node.options) {
    lines.push('');
    lines.push('Choose an option:');
    node.options.forEach((option, index) => {
      lines.push(`${index + 1}. ${option.text}`);
    });
  }

  if (MARKET_NODE_IDS.has(state.nodeId) || node.marketEnabled) {
    lines.push('');
    lines.push("Market commands: 'stores', 'buy <store> <item>'");
  }

  if (node.end) {
    lines.push('');
    lines.push('Type restart to play again, or quit to close.');
  }

  return lines;
};

const applyEffects = (state, effects) => {
  if (!effects) {
    return state;
  }

  const next = { ...state };
  if (typeof effects.gold === 'number') {
    next.gold = Math.max(0, next.gold + effects.gold);
  }

  if (effects.addItem) {
    const items = Array.isArray(effects.addItem) ? effects.addItem : [effects.addItem];
    const deduped = new Set(next.inventory);
    items.forEach((item) => deduped.add(item));
    next.inventory = [...deduped];
  }

  if (effects.reputation) {
    next.reputation = effects.reputation;
  }

  return next;
};

const formatTransitionSummary = (fromNodeId, selectedOption, nextNodeId) => {
  const fromNode = STORY_NODES[fromNodeId];
  const nextNode = STORY_NODES[nextNodeId];
  const effects = selectedOption.effects || {};
  const lines = [''];

  lines.push(`Decision impact: ${selectedOption.text}`);

  const impactParts = [];
  if (typeof effects.gold === 'number') {
    if (effects.gold > 0) {
      impactParts.push(`you gain ${effects.gold} gold`);
    } else if (effects.gold < 0) {
      impactParts.push(`you lose ${Math.abs(effects.gold)} gold`);
    }
  }

  if (effects.addItem) {
    const items = Array.isArray(effects.addItem) ? effects.addItem : [effects.addItem];
    impactParts.push(`you gain ${items.join(', ')}`);
  }

  if (effects.reputation) {
    impactParts.push(`your reputation shifts to ${effects.reputation}`);
  }

  if (impactParts.length === 0) {
    lines.push('Story consequence: this choice alters your path and character relationships.');
  } else {
    lines.push(`Story consequence: ${impactParts.join('; ')}.`);
  }

  const nextHint = nextNode?.text?.[0]
    ? nextNode.text[0]
    : 'This path advances the story to the next stage.';
  lines.push(`Next connection: from ${fromNode.title}, this leads to ${nextNode.title}, where ${nextHint.toLowerCase()}`);

  return lines;
};

const enterNode = (state, nodeId) => {
  const node = STORY_NODES[nodeId];
  let next = { ...state, nodeId };
  if (node.onEnter) {
    next = applyEffects(next, node.onEnter);
  }
  const lines = formatNodeLines(next);
  return {
    ...next,
    running: !node.end,
    output: [...next.output, ...lines]
  };
};

const formatStores = () => {
  const lines = ['Available stores:'];
  MARKET_STORES.forEach((store, storeIndex) => {
    lines.push(`${storeIndex + 1}. ${store.name}`);
    store.items.forEach((item, itemIndex) => {
      lines.push(`   ${itemIndex + 1}) ${item.name} - ${item.cost} gold`);
    });
  });
  return lines;
};

export const createInitialState = () => {
  const base = {
    nodeId: 'node0',
    gold: 50,
    inventory: [],
    reputation: 'neutral',
    running: true,
    output: [
      'Welcome to Trail of Echoes.',
      "Enter a number to choose story options. Type 'help' for commands."
    ]
  };

  return {
    ...base,
    output: [...base.output, ...formatNodeLines(base)]
  };
};

export const applyCommand = (state, rawInput) => {
  const input = rawInput.trim();
  if (!input) {
    return state;
  }

  const nextOutput = [...state.output, `> ${input}`];
  const normalized = input.toLowerCase();

  if (normalized === 'restart') {
    const restarted = createInitialState();
    return restarted;
  }

  if (!state.running) {
    return {
      ...state,
      output: [...nextOutput, "Story ended. Type 'restart' to play again."]
    };
  }

  if (normalized === 'quit' || normalized === 'exit') {
    return {
      ...state,
      running: false,
      output: [...nextOutput, 'Thanks for playing.']
    };
  }

  if (normalized === 'help') {
    return {
      ...state,
      output: [
        ...nextOutput,
        'Commands: <number>, help, look, status, inventory, stores, buy <store> <item>, restart, quit'
      ]
    };
  }

  if (normalized === 'look') {
    return {
      ...state,
      output: [...nextOutput, ...formatNodeLines(state)]
    };
  }

  if (normalized === 'status') {
    return {
      ...state,
      output: [
        ...nextOutput,
        `Node: ${STORY_NODES[state.nodeId].title}`,
        `Gold: ${state.gold}`,
        `Reputation: ${state.reputation}`
      ]
    };
  }

  if (normalized === 'inventory' || normalized === 'inv' || normalized === 'i') {
    return {
      ...state,
      output: [
        ...nextOutput,
        state.inventory.length > 0
          ? `Inventory: ${state.inventory.join(', ')}`
          : 'Inventory: empty'
      ]
    };
  }

  if (normalized === 'stores') {
    if (!MARKET_NODE_IDS.has(state.nodeId) && !STORY_NODES[state.nodeId].marketEnabled) {
      return {
        ...state,
        output: [...nextOutput, 'You can only browse stores while in market-related nodes.']
      };
    }
    return {
      ...state,
      output: [...nextOutput, ...formatStores()]
    };
  }

  if (normalized.startsWith('buy ')) {
    if (!MARKET_NODE_IDS.has(state.nodeId) && !STORY_NODES[state.nodeId].marketEnabled) {
      return {
        ...state,
        output: [...nextOutput, 'You can only buy items in market-related nodes.']
      };
    }

    const parts = normalized.split(/\s+/);
    const storeIndex = Number(parts[1]) - 1;
    const itemIndex = Number(parts[2]) - 1;
    const store = MARKET_STORES[storeIndex];
    const item = store?.items[itemIndex];

    if (!store || !item) {
      return {
        ...state,
        output: [...nextOutput, 'Invalid store or item index. Use stores to view valid options.']
      };
    }

    if (state.gold < item.cost) {
      return {
        ...state,
        output: [...nextOutput, `Not enough gold for ${item.name}. Cost: ${item.cost}.`]
      };
    }

    const alreadyOwned = state.inventory.includes(item.name);
    const updated = {
      ...state,
      gold: state.gold - item.cost,
      inventory: alreadyOwned ? state.inventory : [...state.inventory, item.name],
      output: [
        ...nextOutput,
        `Purchased ${item.name} from ${store.name} for ${item.cost} gold.`,
        `Gold remaining: ${state.gold - item.cost}`
      ]
    };
    return updated;
  }

  const choice = Number(normalized);
  if (Number.isNaN(choice)) {
    return {
      ...state,
      output: [...nextOutput, 'Invalid command. Enter a number or type help.']
    };
  }

  const node = STORY_NODES[state.nodeId];
  if (!node.options || choice < 1 || choice > node.options.length) {
    return {
      ...state,
      output: [...nextOutput, 'That option is not available.']
    };
  }

  const selected = node.options[choice - 1];

  if (selected.requiresItem && !state.inventory.includes(selected.requiresItem)) {
    return {
      ...state,
      output: [...nextOutput, `You need ${selected.requiresItem} to choose that option.`]
    };
  }

  const transitionLines = formatTransitionSummary(state.nodeId, selected, selected.next);
  const withEffects = applyEffects(
    { ...state, output: [...nextOutput, ...transitionLines] },
    selected.effects
  );
  return enterNode(withEffects, selected.next);
};
