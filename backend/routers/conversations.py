"""
Conversations Router — CRUD for conversation history.
Replaces: main.py L77-106 (session state management) + logutils.py usage
"""

import json
import os
import aiofiles
from typing import Dict, List
from fastapi import APIRouter, HTTPException

from backend.config import LOG_FILE

router = APIRouter()


async def _load_all_conversations() -> Dict:
    """Load all conversations from the JSON file asynchronously."""
    if not os.path.exists(LOG_FILE):
        return {}
    try:
        async with aiofiles.open(LOG_FILE, "r") as f:
            content = await f.read()
            data = json.loads(content)
            # Handle legacy format (flat array) vs new format (keyed dict)
            if isinstance(data, list):
                return {"main": {"messages": data, "mode": "research"}}
            return data
    except (json.JSONDecodeError, Exception):
        return {}


async def _save_all_conversations(conversations: Dict) -> None:
    """Save all conversations to the JSON file asynchronously."""
    try:
        content = json.dumps(conversations, indent=2)
        async with aiofiles.open(LOG_FILE, "w") as f:
            await f.write(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save conversations: {str(e)}")


@router.get("")
async def list_conversations():
    """
    List all conversations with metadata.
    Source: main.py L100-106 (conversation selector)
    """
    convos = await _load_all_conversations()
    return [
        {
            "id": key,
            "message_count": len(value.get("messages", [])),
            "mode": value.get("mode", "research"),
        }
        for key, value in convos.items()
    ]


@router.get("/{conversation_id}")
async def get_conversation(conversation_id: str):
    """
    Get a specific conversation's message history.
    Source: logutils.load_conversation()
    """
    convos = await _load_all_conversations()
    if conversation_id not in convos:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return convos[conversation_id]


@router.post("")
async def create_conversation(mode: str = "research"):
    """
    Create a new conversation.
    Source: main.py L93-98 (New Chat button)
    """
    convos = await _load_all_conversations()
    new_id = f"chat-{len(convos) + 1}"
    convos[new_id] = {"messages": [], "mode": mode}
    await _save_all_conversations(convos)
    return {"id": new_id, "mode": mode, "messages": []}


@router.put("/{conversation_id}")
async def update_conversation(conversation_id: str, messages: List[Dict]):
    """
    Update a conversation's message history.
    Source: logutils.save_conversation()
    """
    convos = await _load_all_conversations()
    if conversation_id not in convos:
        convos[conversation_id] = {"messages": [], "mode": "research"}
    convos[conversation_id]["messages"] = messages
    await _save_all_conversations(convos)
    return {"id": conversation_id, "status": "updated"}
